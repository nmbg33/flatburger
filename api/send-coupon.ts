import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// ===========================================
// SETUP - Supabase Admin Client
// ===========================================
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// ===========================================
// HELPER - Generate unique coupon code
// ===========================================
function generateCouponCode(): string {
  const prefix = "FB";
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${code}`;
}

// Check if coupon code already exists
async function isCodeUnique(code: string): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from("coupons")
    .select("id")
    .eq("coupon_code", code)
    .single();
  return !data;
}

// Generate unique coupon code with retry
async function generateUniqueCouponCode(maxRetries = 10): Promise<string> {
  for (let i = 0; i < maxRetries; i++) {
    const code = generateCouponCode();
    if (await isCodeUnique(code)) {
      return code;
    }
    console.log(`⚠️ Code ${code} already exists, retrying...`);
  }
  // Fallback: add timestamp suffix for guaranteed uniqueness
  const timestamp = Date.now().toString(36).toUpperCase();
  return `FB-${timestamp}`;
}

// ===========================================
// MAIN API HANDLER
// ===========================================
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("🔍 Environment check:", {
    hasSupabaseUrl: !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL),
    hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  });

  try {
    // ===========================================
    // 1. PARSE & VALIDATE INPUT
    // ===========================================
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { email, phone } = data;

    if (!email || !phone) {
      return res.status(400).json({ error: "Email i telefon su obavezni" });
    }

    console.log("📧 Processing request for:", { email, phone });

    // ===========================================
    // 2. GENERATE UNIQUE COUPON CODE
    // ===========================================
    const couponCode = await generateUniqueCouponCode();

    console.log("🎟️ Generated coupon:", couponCode);

    // ===========================================
    // 3. SAVE TO SUPABASE
    // n8n will detect this and send the email!
    // ===========================================
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("❌ SUPABASE_SERVICE_ROLE_KEY not configured!");
      return res.status(500).json({ error: "Server konfiguracija greška" });
    }

    console.log("📝 Saving to Supabase...");

    const { data: insertData, error: insertError } = await supabaseAdmin
      .from("coupons")
      .insert({
        email: email,
        phone: phone,
        coupon_code: couponCode,
        used: false,
        email_sent: false, // n8n will update this to true after sending
      })
      .select()
      .single();

    if (insertError) {
      console.error("❌ Supabase INSERT ERROR:", {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code,
      });
      return res.status(500).json({
        error: "Greška pri čuvanju. Pokušaj ponovo.",
        details: insertError.message
      });
    }

    console.log("✅ Supabase INSERT SUCCESS:", insertData);
    console.log("📨 n8n will now detect this and send the email...");

    // ===========================================
    // 4. RETURN SUCCESS
    // ===========================================
    return res.status(200).json({
      success: true,
      couponCode,
      email,
      phone,
      message: "Kupon kreiran! Email stiže uskoro.",
    });

  } catch (err) {
    console.error("❌ CRITICAL ERROR:", err);
    return res.status(500).json({
      error: "Server greška. Pokušaj ponovo.",
      details: err instanceof Error ? err.message : "Unknown error"
    });
  }
}

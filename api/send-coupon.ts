import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

// ===========================================
// SETUP - Supabase Admin Client
// ===========================================
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// ===========================================
// SETUP - Gmail SMTP Transporter
// ===========================================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

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
// HELPER - Generate email HTML
// ===========================================
function generateEmailHTML(couponCode: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1C33C3 0%, #0A1A3D 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
      <div style="font-size: 60px; margin-bottom: 15px;">🍔</div>
      <h1 style="margin: 0; font-size: 28px;">ČESTITAMO!</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Dobio/la si ekskluzivni kupon za 20% popust</p>
    </div>

    <!-- Body -->
    <div style="padding: 40px 30px; background: white;">

      <!-- Coupon Code Box -->
      <div style="background: linear-gradient(135deg, #FEEBCB 0%, #FED7AA 100%); border: 3px dashed #1C33C3; border-radius: 12px; padding: 30px; text-align: center; margin: 20px 0;">
        <div style="font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Tvoj kupon kod</div>
        <div style="font-size: 42px; font-weight: bold; color: #1C33C3; font-family: 'Courier New', monospace; letter-spacing: 4px; margin: 10px 0;">${couponCode}</div>
      </div>

      <!-- Instructions -->
      <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1C33C3; margin-top: 0; font-size: 18px;">📍 Kako da iskoristiš kupon:</h3>
        <ol style="margin: 15px 0; padding-left: 20px; line-height: 1.8;">
          <li><strong>Dođi u Flat Burger lokal</strong><br><span style="color: #666;">Dečanska 4, Stari Grad, Beograd</span></li>
          <li><strong>Pokaži ovaj kod osobi na kasi</strong><br><span style="color: #666;">Kod: ${couponCode}</span></li>
          <li><strong>Uživaj u 20% popustu</strong><br><span style="color: #666;">Važi na celu porudžbinu! 🎉</span></li>
        </ol>
      </div>

      <!-- Warning -->
      <div style="background: #FFF3CD; border-left: 4px solid #F39C12; padding: 15px; border-radius: 6px; margin: 20px 0; font-size: 14px; color: #856404;">
        ⏰ <strong>Važno:</strong> Kupon se može iskoristiti samo jednom i važi 30 dana od danas.
      </div>

      <p style="text-align: center; color: #666; margin-top: 30px;">
        Vidimo se u Flat Burgeru! 🍔<br>
        <strong>Dečanska 4, Beograd</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="background: #0A1A3D; color: white; padding: 30px; text-align: center; font-size: 14px; border-radius: 0 0 16px 16px;">
      <p style="margin: 0;">
        Flat Burger - Najbolji burgeri u gradu!<br>
        <a href="https://flatburger.vercel.app" style="color: #FEEBCB; text-decoration: none;">flatburger.vercel.app</a>
      </p>
    </div>

  </div>
</body>
</html>
`;
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
    hasGmailUser: !!process.env.GMAIL_USER,
    hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD,
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
        email_sent: false,
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

    // ===========================================
    // 4. SEND EMAIL VIA GMAIL SMTP
    // ===========================================
    let emailSent = false;

    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        console.log("📨 Sending email via Gmail SMTP...");

        await transporter.sendMail({
          from: `"Flat Burger" <${process.env.GMAIL_USER}>`,
          to: email,
          subject: "🍔 Tvoj Flat Burger kupon - 20% POPUST!",
          html: generateEmailHTML(couponCode),
        });

        console.log("✅ Email sent successfully!");
        emailSent = true;

        // Update email_sent to true in Supabase
        await supabaseAdmin
          .from("coupons")
          .update({ email_sent: true })
          .eq("coupon_code", couponCode);

      } catch (emailErr) {
        console.error("❌ Email sending failed:", emailErr);
        // Don't fail the whole request - coupon is still saved
      }
    } else {
      console.warn("⚠️ Gmail credentials not configured - skipping email");
    }

    // ===========================================
    // 5. RETURN SUCCESS
    // ===========================================
    return res.status(200).json({
      success: true,
      couponCode,
      email,
      phone,
      emailSent,
      message: emailSent
        ? "Kupon kreiran i email poslat!"
        : "Kupon kreiran! (Email nije konfigurisan)",
    });

  } catch (err) {
    console.error("❌ CRITICAL ERROR:", err);
    return res.status(500).json({
      error: "Server greška. Pokušaj ponovo.",
      details: err instanceof Error ? err.message : "Unknown error"
    });
  }
}

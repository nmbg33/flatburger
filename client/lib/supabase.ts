import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Missing Supabase environment variables. Falling back to localStorage."
  );
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const isSupabaseConfigured = !!supabase;

// Database types
export interface CouponRecord {
  id: string;
  email: string;
  phone: string;
  coupon_code: string;
  created_at: string;
  used: boolean;
  used_at: string | null;
  expires_at: string;
}

// Helper functions for coupon operations
export async function saveCouponToSupabase(
  email: string,
  phone: string,
  couponCode: string
): Promise<CouponRecord | null> {
  console.log("🔍 saveCouponToSupabase called with:", { email, phone, couponCode });
  console.log("🔍 Supabase client exists:", !!supabase);
  console.log("🔍 Supabase URL:", supabaseUrl ? "SET" : "NOT SET");
  console.log("🔍 Supabase Anon Key:", supabaseAnonKey ? "SET" : "NOT SET");

  if (!supabase) {
    console.error("❌ Supabase client is null - check env variables");
    return null;
  }

  try {
    console.log("📝 Attempting INSERT into coupons table...");

    const { data, error } = await supabase
      .from("coupons")
      .insert([
        {
          email: email,
          phone: phone,
          coupon_code: couponCode,
          used: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase INSERT error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return null;
    }

    console.log("✅ Successfully inserted into Supabase:", data);
    return data as CouponRecord;
  } catch (err) {
    console.error("❌ Exception in saveCouponToSupabase:", err);
    return null;
  }
}

export async function getCouponFromSupabase(
  couponCode: string
): Promise<CouponRecord | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("coupon_code", couponCode)
      .single();

    if (error) {
      console.error("Supabase select error:", error);
      return null;
    }

    return data as CouponRecord;
  } catch (err) {
    console.error("Error getting coupon from Supabase:", err);
    return null;
  }
}

export async function markCouponAsUsed(
  couponCode: string
): Promise<CouponRecord | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("coupons")
      .update({
        used: true,
        used_at: new Date().toISOString(),
      })
      .eq("coupon_code", couponCode)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      return null;
    }

    return data as CouponRecord;
  } catch (err) {
    console.error("Error marking coupon as used:", err);
    return null;
  }
}

export interface CouponStats {
  today: number;
  active: number;
  used: number;
}

export async function getCouponStats(): Promise<CouponStats> {
  if (!supabase) {
    return { today: 0, active: 0, used: 0 };
  }

  try {
    // Get total count
    const { count: totalCount } = await supabase
      .from("coupons")
      .select("*", { count: "exact", head: true });

    // Get used count
    const { count: usedCount } = await supabase
      .from("coupons")
      .select("*", { count: "exact", head: true })
      .eq("used", true);

    // Get today's used count
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count: todayCount } = await supabase
      .from("coupons")
      .select("*", { count: "exact", head: true })
      .eq("used", true)
      .gte("used_at", today.toISOString());

    return {
      today: todayCount || 0,
      active: (totalCount || 0) - (usedCount || 0),
      used: usedCount || 0,
    };
  } catch (err) {
    console.error("Error getting coupon stats:", err);
    return { today: 0, active: 0, used: 0 };
  }
}

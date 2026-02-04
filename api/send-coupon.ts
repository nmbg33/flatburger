import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate unique coupon code
function generateCouponCode(): string {
  const prefix = "FB";
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${code}`;
}

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

  try {
    const data =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { email, phone } = data;

    // Validate
    if (!email || !phone) {
      return res.status(400).json({ error: "Email i telefon su obavezni" });
    }

    // Generate unique coupon code
    const couponCode = generateCouponCode();
    const timestamp = new Date().toISOString();

    // Send email via Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "Flat Burger <onboarding@resend.dev>",
      to: email,
      subject: "🍔 Tvoj Flat Burger kupon - 20% POPUST!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1C33C3 0%, #0A1A3D 100%); color: white; padding: 40px 30px; text-align: center;">
              <div style="font-size: 60px; margin-bottom: 15px;">🍔</div>
              <h1 style="margin: 0; font-size: 28px; font-family: 'Bricolage Grotesque', Arial, sans-serif;">ČESTITAMO!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Dobio/la si ekskluzivni kupon za 20% popust</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">

              <!-- Coupon Box -->
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
            <div style="background: #0A1A3D; color: white; padding: 30px; text-align: center; font-size: 14px;">
              <p style="margin: 0;">
                Flat Burger - Najbolji burgeri u gradu!<br>
                <a href="https://flatburger.vercel.app" style="color: #FEEBCB; text-decoration: none;">flatburger.vercel.app</a>
              </p>
              <p style="font-size: 12px; color: #95a5a6; margin-top: 15px;">
                Ovaj email je poslat jer si zatražio kupon na našem website-u.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Greška pri slanju email-a" });
    }

    // Return success with coupon data
    return res.status(200).json({
      success: true,
      couponCode,
      timestamp,
      email,
      phone,
      message: "Email poslat uspešno!",
    });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Server greška" });
  }
}

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const data =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const {
      fullName,
      email,
      phone,
      cityCountry,
      locationDetails,
      experience,
      budget,
      timeline,
      referral,
      message,
      consent,
      locale = "en",
    } = data;

    if (
      !fullName ||
      !email ||
      !phone ||
      !cityCountry ||
      !locationDetails ||
      !experience ||
      !budget ||
      !timeline ||
      !consent
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const subject =
      locale === "sr"
        ? `Nova prijava za franšizu — ${fullName}`
        : `New Franchise Application — ${fullName}`;

    const textBody = `
Name: ${fullName}
Email: ${email}
Phone: ${phone}
City/Country: ${cityCountry}
Proposed Location: ${locationDetails}
Experience: ${experience}
Budget (EUR): ${budget}
Timeline: ${timeline}
Heard about us: ${referral || "-"}
Message: ${message || "-"}
Consent: ${consent ? "Yes" : "No"}
    `.trim();

    await resend.emails.send({
      from: "Flat Burger <no-reply@your-domain.com>",
      to: "flatburgerbg@gmail.com",
      subject,
      text: textBody,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal error" });
  }
}

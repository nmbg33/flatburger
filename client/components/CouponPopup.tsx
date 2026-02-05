import React, { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { FlatBurgerIcon } from "./FlatBurgerIcon";
import {
  isSupabaseConfigured,
  saveCouponToSupabase,
} from "../lib/supabase";

interface CustomerData {
  email: string;
  phone: string;
  couponCode: string;
  timestamp: string;
  used: boolean;
  usedAt: string | null;
}

const canUseDOM =
  typeof window !== "undefined" && typeof document !== "undefined";

const CONFIG = {
  showDelay: 3000,
  scrollTrigger: 40,
  cookieName: "flat_burger_popup_shown",
  cookieExpiry: 30,
};

// Check if popup was already shown
const hasSeenPopup = (): boolean => {
  if (!canUseDOM) return false;
  const seen = localStorage.getItem(CONFIG.cookieName);
  if (seen !== "true") return false;

  const expiry = localStorage.getItem(CONFIG.cookieName + "_expiry");
  if (expiry && new Date() > new Date(expiry)) {
    localStorage.removeItem(CONFIG.cookieName);
    localStorage.removeItem(CONFIG.cookieName + "_expiry");
    return false;
  }
  return true;
};

// Mark popup as seen
const markPopupAsSeen = (): void => {
  if (!canUseDOM) return;
  localStorage.setItem(CONFIG.cookieName, "true");
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + CONFIG.cookieExpiry);
  localStorage.setItem(CONFIG.cookieName + "_expiry", expiry.toISOString());
};

// Save to localStorage as fallback
const saveToLocalStorage = (customerData: CustomerData): void => {
  if (!canUseDOM) return;
  const customers = JSON.parse(
    localStorage.getItem("flat_burger_customers") || "[]"
  );
  customers.push(customerData);
  localStorage.setItem("flat_burger_customers", JSON.stringify(customers));
  localStorage.setItem(
    `coupon_${customerData.couponCode}`,
    JSON.stringify(customerData)
  );
};

export const CouponPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const showPopup = useCallback(() => {
    if (!canUseDOM) return;
    if (hasSeenPopup()) return;
    setIsVisible(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closePopup = useCallback(() => {
    if (!canUseDOM) return;
    setIsVisible(false);
    document.body.style.overflow = "";
    markPopupAsSeen();
  }, []);

  // Initialize triggers
  useEffect(() => {
    if (!canUseDOM) return;
    if (hasSeenPopup()) return;

    // Time trigger
    const timer = setTimeout(showPopup, CONFIG.showDelay);

    // Scroll trigger
    let scrollTriggered = false;
    const handleScroll = () => {
      if (scrollTriggered || hasSeenPopup()) return;
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      if (scrollPercent > CONFIG.scrollTrigger) {
        scrollTriggered = true;
        showPopup();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showPopup]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        closePopup();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isVisible, closePopup]);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: { email?: string; phone?: string } = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email je obavezan";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Unesite validnu email adresu";
    }

    // Phone validation - Serbian phone format
    const phoneRegex = /^(\+381|0)[0-9]{8,10}$/;
    const cleanPhone = phone.replace(/\s/g, "");
    if (!phone) {
      newErrors.phone = "Telefon je obavezan";
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Unesite validan broj telefona";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission - sends email with coupon
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Call API to send email with coupon
      const response = await fetch("/api/send-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.replace(/\s/g, ""),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Greška pri slanju email-a");
      }

      // Save to Supabase for admin panel
      const customerData: CustomerData = {
        email: data.email,
        phone: data.phone,
        couponCode: data.couponCode,
        timestamp: data.timestamp,
        used: false,
        usedAt: null,
      };

      console.log("🔍 isSupabaseConfigured:", isSupabaseConfigured);
      console.log("🔍 Customer data to save:", customerData);

      if (isSupabaseConfigured) {
        console.log("📡 Calling saveCouponToSupabase...");
        const savedToSupabase = await saveCouponToSupabase(
          customerData.email,
          customerData.phone,
          customerData.couponCode
        );
        console.log("📡 saveCouponToSupabase result:", savedToSupabase);
        if (savedToSupabase) {
          console.log("✅ Kupon sačuvan u Supabase:", savedToSupabase);
        } else {
          console.warn("⚠️ Supabase save failed, falling back to localStorage");
          saveToLocalStorage(customerData);
        }
      } else {
        console.warn("⚠️ Supabase not configured, using localStorage");
        saveToLocalStorage(customerData);
      }

      console.log("📧 Email poslat sa kuponom:", data.couponCode);
      setShowSuccess(true);
    } catch (err) {
      console.error("Error sending coupon email:", err);
      setSubmitError(
        err instanceof Error ? err.message : "Greška pri slanju. Pokušajte ponovo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(10, 26, 61, 0.85)",
        animation: "fadeIn 0.3s ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closePopup();
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes pop {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .popup-container {
          animation: slideUp 0.4s ease-out;
        }
        .success-icon {
          animation: pop 0.5s ease-out;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(28, 51, 195, 0.2);
          border-top: 4px solid #1C33C3;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div
        className="popup-container relative bg-flat-beige rounded-3xl max-w-md w-full p-8 shadow-2xl"
        style={{
          fontFamily: '"Bricolage Grotesque", sans-serif',
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-flat-blue/10 transition-colors duration-200"
          aria-label="Zatvori"
        >
          <X className="w-6 h-6 text-flat-blue" />
        </button>

        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-flat-beige/95 rounded-3xl flex flex-col items-center justify-center z-10">
            <div className="spinner mb-4"></div>
            <p className="text-flat-blue font-bold text-lg">Šalje se email...</p>
            <p className="text-flat-dark/60 text-sm mt-2">Molimo sačekajte</p>
          </div>
        )}

        {!showSuccess ? (
          /* Form Screen */
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <FlatBurgerIcon size="lg" className="w-16 h-16" />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-flat-blue uppercase tracking-wide mb-2"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
              >
                Ostvari 20% popusta!
              </h2>
              <p className="text-flat-dark/70 text-sm">
                Prijavi se i dobij ekskluzivni kupon na email
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="fb-email"
                  className="block text-flat-dark font-bold text-sm mb-2 uppercase tracking-wide"
                >
                  Email adresa
                </label>
                <input
                  type="email"
                  id="fb-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tvoj@email.com"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-flat-dark placeholder:text-flat-dark/40 focus:outline-none focus:border-flat-blue transition-colors duration-200 disabled:opacity-50 ${
                    errors.email ? "border-red-500" : "border-flat-blue/20"
                  }`}
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="fb-phone"
                  className="block text-flat-dark font-bold text-sm mb-2 uppercase tracking-wide"
                >
                  Telefon
                </label>
                <input
                  type="tel"
                  id="fb-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="06x xxx xxxx"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-flat-dark placeholder:text-flat-dark/40 focus:outline-none focus:border-flat-blue transition-colors duration-200 disabled:opacity-50 ${
                    errors.phone ? "border-red-500" : "border-flat-blue/20"
                  }`}
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Error message */}
              {submitError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                  <p className="text-red-700 text-sm">{submitError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-flat-blue text-flat-beige rounded-full font-bold uppercase tracking-wider text-sm hover:bg-flat-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
              >
                {isSubmitting ? "Šalje se..." : "Dobij kupon na email!"}
              </button>

              <p className="text-center text-flat-dark/50 text-xs mt-4">
                Kupon kod ce ti stici na email. Proveri i spam folder.
              </p>
            </form>
          </div>
        ) : (
          /* Success Screen - Email Sent */
          <div className="text-center">
            <div className="success-icon text-6xl mb-4">📧</div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-green-600 uppercase tracking-wide mb-4"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
            >
              Email Poslat!
            </h2>

            {/* Email Sent Message */}
            <div
              className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-2xl p-6 my-6"
              style={{ boxShadow: "0 8px 32px rgba(34, 197, 94, 0.15)" }}
            >
              <p className="text-green-800 text-lg font-medium mb-2">
                Proveri svoj email inbox!
              </p>
              <p className="text-green-700/80 text-sm">
                Poslali smo ti kupon kod za <strong>20% popust</strong> na adresu koju si uneo/la.
              </p>
            </div>

            {/* Instructions */}
            <div className="text-left bg-flat-blue/5 rounded-xl p-4 mb-4">
              <p className="font-bold text-flat-dark text-sm mb-3">
                📬 Sledeći koraci:
              </p>
              <ol className="text-flat-dark/70 text-sm space-y-2 list-decimal list-inside">
                <li>Otvori svoj email (proveri i spam folder)</li>
                <li>Pronađi email od Flat Burger</li>
                <li>Zapiši ili screenshot-uj kupon kod</li>
                <li>Dođi u lokal i pokaži kod na kasi</li>
              </ol>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-3 mb-6">
              <p className="text-amber-800 text-xs">
                ⏰ Email stiže za par sekundi. Ako ne vidiš email za 5 minuta, proveri spam folder.
              </p>
            </div>

            <button
              onClick={closePopup}
              className="w-full py-3 px-6 bg-green-600 text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-green-700 transition-all duration-300"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
            >
              Razumem
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

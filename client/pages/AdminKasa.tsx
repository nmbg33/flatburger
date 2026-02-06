import React, { useState, useEffect, useCallback } from "react";
import { FlatBurgerIcon } from "../components/FlatBurgerIcon";
import {
  isSupabaseConfigured,
  getCouponFromSupabase,
  markCouponAsUsed,
  getCouponStats,
  getAllCoupons,
  CouponRecord,
} from "../lib/supabase";

interface CustomerData {
  email: string;
  phone: string;
  couponCode: string;
  timestamp: string;
  used: boolean;
  usedAt: string | null;
}

interface Stats {
  today: number;
  active: number;
  used: number;
}

type ResultType = "valid" | "invalid" | "used" | null;

// LocalStorage fallback functions
const getFromLocalStorage = (code: string): CustomerData | null => {
  const data = localStorage.getItem(`coupon_${code}`);
  return data ? JSON.parse(data) : null;
};

const markUsedInLocalStorage = (code: string): CustomerData | null => {
  const data = getFromLocalStorage(code);
  if (!data) return null;

  data.used = true;
  data.usedAt = new Date().toISOString();
  localStorage.setItem(`coupon_${code}`, JSON.stringify(data));

  // Update customers array too
  const customers: CustomerData[] = JSON.parse(
    localStorage.getItem("flat_burger_customers") || "[]"
  );
  const index = customers.findIndex((c) => c.couponCode === code);
  if (index !== -1) {
    customers[index] = data;
    localStorage.setItem("flat_burger_customers", JSON.stringify(customers));
  }

  return data;
};

const getLocalStorageStats = (): Stats => {
  const customers: CustomerData[] = JSON.parse(
    localStorage.getItem("flat_burger_customers") || "[]"
  );
  const total = customers.length;
  const usedCount = customers.filter((c) => c.used).length;
  const activeCount = total - usedCount;

  const today = new Date().toDateString();
  const todayUsed = customers.filter((c) => {
    return c.usedAt && new Date(c.usedAt).toDateString() === today;
  }).length;

  return {
    today: todayUsed,
    active: activeCount,
    used: usedCount,
  };
};

type ViewMode = "check" | "list";

export const AdminKasa: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("check");
  const [inputCode, setInputCode] = useState("");
  const [resultType, setResultType] = useState<ResultType>(null);
  const [resultData, setResultData] = useState<CustomerData | null>(null);
  const [daysLeft, setDaysLeft] = useState(0);
  const [stats, setStats] = useState<Stats>({ today: 0, active: 0, used: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [usingSupabase, setUsingSupabase] = useState(false);
  const [allCoupons, setAllCoupons] = useState<CouponRecord[]>([]);
  const [listLoading, setListLoading] = useState(false);

  // Load statistics
  const loadStats = useCallback(async () => {
    if (isSupabaseConfigured) {
      setUsingSupabase(true);
      const supabaseStats = await getCouponStats();
      setStats(supabaseStats);
    } else {
      setUsingSupabase(false);
      setStats(getLocalStorageStats());
    }
  }, []);

  // Load all coupons for list view
  const loadAllCoupons = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setListLoading(true);
    try {
      const coupons = await getAllCoupons();
      setAllCoupons(coupons);
    } catch (err) {
      console.error("Error loading coupons:", err);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, [loadStats]);

  // Load coupons when switching to list view
  useEffect(() => {
    if (viewMode === "list") {
      loadAllCoupons();
    }
  }, [viewMode, loadAllCoupons]);

  // Check coupon
  const checkCoupon = async () => {
    const kod = inputCode.toUpperCase().trim();
    if (!kod) {
      alert("Unesi kod kupona!");
      return;
    }

    setIsLoading(true);

    try {
      let coupon: CustomerData | CouponRecord | null = null;

      // Try Supabase first
      if (isSupabaseConfigured) {
        const supabaseCoupon = await getCouponFromSupabase(kod);
        if (supabaseCoupon) {
          coupon = {
            email: supabaseCoupon.email,
            phone: supabaseCoupon.phone,
            couponCode: supabaseCoupon.coupon_code,
            timestamp: supabaseCoupon.created_at,
            used: supabaseCoupon.used,
            usedAt: supabaseCoupon.used_at,
          };
        }
      }

      // Fallback to localStorage
      if (!coupon) {
        coupon = getFromLocalStorage(kod);
      }

      if (!coupon) {
        setResultType("invalid");
        setResultData(null);
        setIsLoading(false);
        return;
      }

      if (coupon.used) {
        setResultType("used");
        setResultData(coupon);
        setIsLoading(false);
        return;
      }

      const couponDate = new Date(coupon.timestamp);
      const daysSince = Math.floor(
        (new Date().getTime() - couponDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSince > 30) {
        setResultType("invalid");
        setResultData(coupon);
        setIsLoading(false);
        return;
      }

      setDaysLeft(30 - daysSince);
      setResultType("valid");
      setResultData(coupon);
    } catch (err) {
      console.error("Error checking coupon:", err);
      // Try localStorage as fallback
      const localCoupon = getFromLocalStorage(kod);
      if (localCoupon) {
        if (localCoupon.used) {
          setResultType("used");
          setResultData(localCoupon);
        } else {
          const couponDate = new Date(localCoupon.timestamp);
          const daysSince = Math.floor(
            (new Date().getTime() - couponDate.getTime()) / (1000 * 60 * 60 * 24)
          );
          if (daysSince > 30) {
            setResultType("invalid");
            setResultData(localCoupon);
          } else {
            setDaysLeft(30 - daysSince);
            setResultType("valid");
            setResultData(localCoupon);
          }
        }
      } else {
        setResultType("invalid");
        setResultData(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Use coupon
  const useCoupon = async () => {
    if (!resultData) return;

    const confirmUse = window.confirm(
      `Potvrdi da daješ 20% popust sa kuponom ${resultData.couponCode}?`
    );
    if (!confirmUse) return;

    setIsLoading(true);

    try {
      let updatedData: CustomerData | null = null;

      // Try Supabase first
      if (isSupabaseConfigured) {
        const supabaseResult = await markCouponAsUsed(resultData.couponCode);
        if (supabaseResult) {
          updatedData = {
            email: supabaseResult.email,
            phone: supabaseResult.phone,
            couponCode: supabaseResult.coupon_code,
            timestamp: supabaseResult.created_at,
            used: supabaseResult.used,
            usedAt: supabaseResult.used_at,
          };
        }
      }

      // Fallback to localStorage
      if (!updatedData) {
        updatedData = markUsedInLocalStorage(resultData.couponCode);
      }

      if (updatedData) {
        setResultData(updatedData);
        setResultType("used");
        loadStats();
        setTimeout(resetForm, 3000);
      }
    } catch (err) {
      console.error("Error using coupon:", err);
      // Try localStorage as fallback
      const localResult = markUsedInLocalStorage(resultData.couponCode);
      if (localResult) {
        setResultData(localResult);
        setResultType("used");
        loadStats();
        setTimeout(resetForm, 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setInputCode("");
    setResultType(null);
    setResultData(null);
    setDaysLeft(0);
    loadStats();
  };

  // Format date for display
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("sr-RS", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      checkCoupon();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #1C33C3 0%, #0A1A3D 100%)",
        fontFamily: '"Bricolage Grotesque", sans-serif',
      }}
    >
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pop {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .logo-bounce {
          animation: bounce 2s infinite;
        }
        .result-slide {
          animation: slideIn 0.5s ease-out;
        }
        .result-icon {
          animation: pop 0.6s ease-out;
        }
        .loading-spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>

      <div className="bg-flat-beige rounded-3xl p-8 sm:p-12 max-w-xl w-full shadow-2xl">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setViewMode("check"); resetForm(); }}
            className={`flex-1 py-3 px-4 rounded-xl font-bold uppercase tracking-wider transition-all ${
              viewMode === "check"
                ? "bg-flat-blue text-flat-beige"
                : "bg-flat-blue/10 text-flat-blue hover:bg-flat-blue/20"
            }`}
          >
            ✅ Provera
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex-1 py-3 px-4 rounded-xl font-bold uppercase tracking-wider transition-all ${
              viewMode === "list"
                ? "bg-flat-blue text-flat-beige"
                : "bg-flat-blue/10 text-flat-blue hover:bg-flat-blue/20"
            }`}
          >
            📋 Lista ({allCoupons.length})
          </button>
        </div>

        {/* List View */}
        {viewMode === "list" && (
          <div>
            <div className="text-center mb-4">
              <h1
                className="text-flat-blue text-2xl font-bold uppercase tracking-wide"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
              >
                Svi Kuponi
              </h1>
              <p className="text-flat-dark/60 text-sm">Email adrese i brojevi telefona</p>
            </div>

            {listLoading ? (
              <div className="text-center py-8">
                <div className="loading-spinner w-8 h-8 border-4 border-flat-blue border-t-transparent rounded-full mx-auto" />
                <p className="mt-2 text-flat-dark/60">Učitavanje...</p>
              </div>
            ) : allCoupons.length === 0 ? (
              <div className="text-center py-8 text-flat-dark/60">
                Nema kupona u bazi.
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto space-y-3">
                {allCoupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className={`p-4 rounded-xl border-2 ${
                      coupon.used
                        ? "bg-gray-100 border-gray-200"
                        : "bg-white border-flat-blue/20"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-mono font-bold text-flat-blue">
                          {coupon.coupon_code}
                        </p>
                        <p className="text-sm text-flat-dark/80">📧 {coupon.email}</p>
                        <p className="text-sm text-flat-dark/80">📱 {coupon.phone}</p>
                        <p className="text-xs text-flat-dark/50 mt-1">
                          {new Date(coupon.created_at).toLocaleDateString("sr-RS", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        {coupon.used ? (
                          <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg">
                            ISKORIŠĆEN
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">
                            AKTIVAN
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Export hint */}
            {allCoupons.length > 0 && (
              <div className="mt-4 p-3 bg-flat-blue/5 rounded-xl text-center">
                <p className="text-xs text-flat-dark/60">
                  Ukupno: <strong>{allCoupons.length}</strong> kupona |
                  Aktivnih: <strong>{allCoupons.filter(c => !c.used).length}</strong> |
                  Iskorišćenih: <strong>{allCoupons.filter(c => c.used).length}</strong>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Check View */}
        {viewMode === "check" && !resultType && (
          /* Main Screen */
          <div>
            <div className="text-center">
              <div className="logo-bounce flex justify-center mb-6">
                <FlatBurgerIcon size="lg" className="w-20 h-20" />
              </div>
              <h1
                className="text-flat-blue text-3xl sm:text-4xl font-bold uppercase tracking-wide mb-2"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
              >
                Provera Kupona
              </h1>
              <p className="text-flat-dark/60 text-lg mb-2">Unesi kod kupona</p>
              {usingSupabase && (
                <p className="text-green-600 text-xs mb-6">
                  ✓ Povezano sa bazom podataka
                </p>
              )}
              {!usingSupabase && (
                <p className="text-amber-600 text-xs mb-6">
                  ⚠ Lokalni režim (localStorage)
                </p>
              )}
            </div>

            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              placeholder="FB-XXXXXX"
              maxLength={10}
              autoFocus
              autoComplete="off"
              disabled={isLoading}
              className="w-full text-center text-3xl sm:text-4xl font-bold tracking-widest p-6 rounded-2xl border-4 border-flat-blue/20 bg-white text-flat-blue placeholder:text-flat-blue/30 focus:outline-none focus:border-flat-blue transition-all duration-300 disabled:opacity-50"
              style={{ fontFamily: "monospace" }}
            />

            <button
              onClick={checkCoupon}
              disabled={isLoading}
              className="w-full mt-6 py-5 px-8 bg-flat-blue text-flat-beige rounded-2xl font-bold uppercase tracking-wider text-xl hover:bg-flat-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner w-6 h-6 border-3 border-flat-beige border-t-transparent rounded-full" />
                  Provera...
                </>
              ) : (
                "✅ Proveri"
              )}
            </button>

            {/* Stats */}
            <div className="flex justify-around mt-10 pt-8 border-t-2 border-flat-blue/10">
              <div className="text-center">
                <div className="text-4xl font-bold text-flat-blue">
                  {stats.today}
                </div>
                <div className="text-xs text-flat-dark/50 uppercase tracking-wider mt-1">
                  Danas
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-flat-blue">
                  {stats.active}
                </div>
                <div className="text-xs text-flat-dark/50 uppercase tracking-wider mt-1">
                  Aktivni
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-flat-blue">
                  {stats.used}
                </div>
                <div className="text-xs text-flat-dark/50 uppercase tracking-wider mt-1">
                  Iskorišćeni
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Result Screen */}
        {viewMode === "check" && resultType && (
          <div className="result-slide">
            {resultType === "valid" && (
              <div
                className="text-center p-8 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                }}
              >
                <div className="result-icon text-8xl mb-4">✅</div>
                <h2
                  className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-wide mb-4"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                >
                  Validan!
                </h2>
                <p className="text-white/90 text-xl mb-6">
                  Kupon je <strong>VAŽEĆI</strong>. Kupac dobija{" "}
                  <strong>20% POPUST</strong>!
                </p>

                {resultData && (
                  <div className="bg-white/20 rounded-xl p-4 text-white text-left mb-6">
                    <p className="font-bold mb-2">Podaci kupca:</p>
                    <p>📧 {resultData.email}</p>
                    <p>📱 {resultData.phone}</p>
                    <p>🗓️ Preostalo: {daysLeft} dana</p>
                  </div>
                )}

                <button
                  onClick={useCoupon}
                  disabled={isLoading}
                  className="w-full py-5 px-8 bg-white text-green-600 rounded-2xl font-bold uppercase tracking-wider text-xl hover:bg-green-50 transition-all duration-300 shadow-lg mb-4 disabled:opacity-50 flex items-center justify-center gap-3"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner w-6 h-6 border-3 border-green-600 border-t-transparent rounded-full" />
                      Odobravanje...
                    </>
                  ) : (
                    "🎉 Odobri Popust (20%)"
                  )}
                </button>
              </div>
            )}

            {resultType === "invalid" && (
              <div
                className="text-center p-8 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                }}
              >
                <div className="result-icon text-8xl mb-4">❌</div>
                <h2
                  className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-wide mb-4"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                >
                  {resultData ? "Istekao" : "Nevažeći Kod"}
                </h2>
                <p className="text-white/90 text-xl">
                  {resultData
                    ? "Ovaj kupon je istekao (prošlo više od 30 dana)."
                    : "Ovaj kupon ne postoji u sistemu. Proveri da li je kod tačno ukucan."}
                </p>
              </div>
            )}

            {resultType === "used" && resultData && (
              <div
                className="text-center p-8 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                }}
              >
                <div className="result-icon text-8xl mb-4">
                  {resultData.usedAt &&
                  new Date(resultData.usedAt).getTime() > Date.now() - 5000
                    ? "🎉"
                    : "⚠️"}
                </div>
                <h2
                  className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-wide mb-4"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                >
                  {resultData.usedAt &&
                  new Date(resultData.usedAt).getTime() > Date.now() - 5000
                    ? "Popust Odobren!"
                    : "Već Iskorišćen"}
                </h2>
                <p className="text-white/90 text-xl mb-4">
                  {resultData.usedAt &&
                  new Date(resultData.usedAt).getTime() > Date.now() - 5000
                    ? "Kupon je uspešno iskorišćen. Kupac dobija 20% popust na račun!"
                    : `Ovaj kupon je već iskorišćen ${formatDate(resultData.usedAt || "")}`}
                </p>

                <div className="bg-white/20 rounded-xl p-4 text-white text-left">
                  <p className="font-bold mb-2">Podaci kupca:</p>
                  <p>📧 {resultData.email}</p>
                  <p>📱 {resultData.phone}</p>
                </div>
              </div>
            )}

            <button
              onClick={resetForm}
              className="w-full mt-6 py-4 px-8 bg-flat-blue/20 text-flat-blue rounded-2xl font-bold uppercase tracking-wider text-lg hover:bg-flat-blue/30 transition-all duration-300"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
            >
              ↻ Novi Kod
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminKasa;

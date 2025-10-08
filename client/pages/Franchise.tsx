import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";

const useFranchiseSEO = (pathForLocale: string) => {
  const { language, t } = useLanguage();
  useEffect(() => {
    const title = t("seo.franchise.title");
    const desc = t("seo.franchise.meta");

    document.title = title;

    const ensureMeta = (
      attr: "name" | "property",
      key: string,
      value: string,
    ) => {
      let el = document.querySelector(
        `meta[${attr}='${key}']`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    ensureMeta("name", "description", desc);
    ensureMeta("property", "og:title", title);
    ensureMeta("property", "og:description", desc);
    ensureMeta("property", "og:type", "website");
    // Use favicon as brand OG image available in repo
    ensureMeta("property", "og:image", `${window.location.origin}/favicon.ico`);

    let link = document.querySelector(
      "link[rel='canonical']",
    ) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    const href = `${window.location.origin}${pathForLocale}`;
    link.setAttribute("href", href);
  }, [language, t, pathForLocale]);
};

export const Franchise: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<HTMLDivElement | null>(null);

  const pathForLocale = language === "sr" ? "/fransiza" : "/franchise";
  useFranchiseSEO(pathForLocale);

  // FAQ JSON-LD schema
  useEffect(() => {
    const faqEntities = [
      { q: t("franchise.faq.q1"), a: t("franchise.faq.a1") },
      { q: t("franchise.faq.q2"), a: t("franchise.faq.a2") },
      { q: t("franchise.faq.q3"), a: t("franchise.faq.a3") },
      { q: t("franchise.faq.q4"), a: t("franchise.faq.a4") },
      { q: t("franchise.faq.q5"), a: t("franchise.faq.a5") },
    ].map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }));

    const data = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqEntities,
    };

    let script = document.getElementById(
      "faq-schema",
    ) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "faq-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(data);
  }, [language, t]);

  // Keep route in sync with language for this page
  useEffect(() => {
    const onFranchise =
      location.pathname === "/franchise" || location.pathname === "/fransiza";
    if (!onFranchise) return;
    const shouldBe = pathForLocale;
    if (location.pathname !== shouldBe) {
      navigate(shouldBe, { replace: true });
    }
  }, [language]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    cityCountry: "",
    locationDetails: "",
    experience: "",
    budget: "",
    timeline: "",
    referral: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = () => {
    const e: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = form.phone.replace(/\D/g, "");
    const numBudget = Number(form.budget);

    if (!form.fullName.trim()) e.fullName = t("franchise.errors.fullName");
    if (!emailRegex.test(form.email)) e.email = t("franchise.errors.email");
    if (phoneDigits.length < 6) e.phone = t("franchise.errors.phone");
    if (!form.cityCountry.trim())
      e.cityCountry = t("franchise.errors.cityCountry");
    if (!form.locationDetails.trim())
      e.locationDetails = t("franchise.errors.locationDetails");
    if (!form.experience.trim())
      e.experience = t("franchise.errors.experience");
    if (!Number.isFinite(numBudget) || numBudget < 0)
      e.budget = t("franchise.errors.budget");
    if (!form.timeline) e.timeline = t("franchise.errors.timeline");
    if (!form.consent) e.consent = t("franchise.errors.consent");

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setStatus("idle");
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/franchise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          budget: Number(form.budget),
          locale: language,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      // Optional: tracking event non-blocking
      try {
        // @ts-ignore
        if (window.gtag)
          window.gtag("event", "franchise_application_submitted");
      } catch {}
      setForm({
        fullName: "",
        email: "",
        phone: "",
        cityCountry: "",
        locationDetails: "",
        experience: "",
        budget: "",
        timeline: "",
        referral: "",
        message: "",
        consent: false,
      });
    } catch (err) {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const faq = useMemo(
    () => [
      { q: t("franchise.faq.q1"), a: t("franchise.faq.a1") },
      { q: t("franchise.faq.q2"), a: t("franchise.faq.a2") },
      { q: t("franchise.faq.q3"), a: t("franchise.faq.a3") },
      { q: t("franchise.faq.q4"), a: t("franchise.faq.a4") },
      { q: t("franchise.faq.q5"), a: t("franchise.faq.a5") },
    ],
    [language, t],
  );

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-flat-beige pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <section className="text-center mb-14">
          <h1
            className="mt-8 md:mt-12 lg:mt-16 text-5xl md:text-7xl lg:text-8xl font-black text-flat-blue mb-4 leading-tight tracking-tight"
            style={{ fontFamily: "Bricolage Grotesque" }}
          >
            {t("franchise.hero.title")}
          </h1>
          <p
            className="text-xl md:text-2xl text-flat-blue/70 font-medium max-w-3xl mx-auto"
            style={{ fontFamily: "Bricolage Grotesque" }}
          >
            {t("franchise.hero.subtitle")}
          </p>
          <div className="mt-8">
            <Button
              onClick={scrollToForm}
              className="bg-flat-blue text-flat-beige hover:bg-flat-dark px-8 py-6 text-lg rounded-full font-black tracking-wider uppercase"
            >
              {t("franchise.hero.cta")}
            </Button>
          </div>
        </section>

        {/* Info Cards */}
        <section className="mb-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: t("franchise.cards.support.title"),
                desc: t("franchise.cards.support.desc"),
              },
              {
                title: t("franchise.cards.brand.title"),
                desc: t("franchise.cards.brand.desc"),
              },
              {
                title: t("franchise.cards.quality.title"),
                desc: t("franchise.cards.quality.desc"),
              },
              {
                title: t("franchise.cards.scaling.title"),
                desc: t("franchise.cards.scaling.desc"),
              },
            ].map((c, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <h3
                  className="text-2xl font-black text-flat-blue mb-2"
                  style={{ fontFamily: "Bricolage Grotesque" }}
                >
                  {c.title}
                </h3>
                <p
                  className="text-flat-blue/80"
                  style={{ fontFamily: "Bricolage Grotesque" }}
                >
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Requirements strip */}
        <section className="mb-14">
          <div className="bg-flat-blue text-flat-beige rounded-3xl p-6 text-center">
            <p
              className="text-lg md:text-xl font-medium"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              {t("franchise.requirements")}
            </p>
          </div>
        </section>

        {/* Form */}
        <section ref={formRef} id="franchise-form" className="mb-16">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-xl">
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="col-span-1">
                <Label htmlFor="fullName">{t("franchise.form.fullName")}</Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                  placeholder={t("franchise.form.fullName")}
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && (
                  <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="col-span-1">
                <Label htmlFor="email">{t("franchise.form.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="col-span-1">
                <Label htmlFor="phone">{t("franchise.form.phone")}</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+381..."
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="col-span-1">
                <Label htmlFor="cityCountry">
                  {t("franchise.form.cityCountry")}
                </Label>
                <Input
                  id="cityCountry"
                  value={form.cityCountry}
                  onChange={(e) =>
                    setForm({ ...form, cityCountry: e.target.value })
                  }
                  placeholder={t("franchise.form.cityCountry")}
                  aria-invalid={!!errors.cityCountry}
                />
                {errors.cityCountry && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.cityCountry}
                  </p>
                )}
              </div>

              <div className="col-span-1 md:col-span-2">
                <Label htmlFor="locationDetails">
                  {t("franchise.form.locationDetails")}
                </Label>
                <Textarea
                  id="locationDetails"
                  value={form.locationDetails}
                  onChange={(e) =>
                    setForm({ ...form, locationDetails: e.target.value })
                  }
                  placeholder={t("franchise.form.locationDetails")}
                  aria-invalid={!!errors.locationDetails}
                />
                {errors.locationDetails && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.locationDetails}
                  </p>
                )}
              </div>

              <div className="col-span-1 md:col-span-2">
                <Label htmlFor="experience">
                  {t("franchise.form.experience")}
                </Label>
                <Textarea
                  id="experience"
                  value={form.experience}
                  onChange={(e) =>
                    setForm({ ...form, experience: e.target.value })
                  }
                  placeholder={t("franchise.form.experience")}
                  aria-invalid={!!errors.experience}
                />
                {errors.experience && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.experience}
                  </p>
                )}
              </div>

              <div className="col-span-1">
                <Label htmlFor="budget">{t("franchise.form.budget")}</Label>
                <Input
                  id="budget"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  placeholder="0"
                  aria-invalid={!!errors.budget}
                />
                {errors.budget && (
                  <p className="text-red-600 text-sm mt-1">{errors.budget}</p>
                )}
              </div>

              <div className="col-span-1">
                <Label htmlFor="timeline">{t("franchise.form.timeline")}</Label>
                <Select
                  value={form.timeline}
                  onValueChange={(v) => setForm({ ...form, timeline: v })}
                >
                  <SelectTrigger id="timeline" aria-invalid={!!errors.timeline}>
                    <SelectValue placeholder={t("franchise.form.timeline")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-3">
                      {t("franchise.form.timeline.0_3")}
                    </SelectItem>
                    <SelectItem value="3-6">
                      {t("franchise.form.timeline.3_6")}
                    </SelectItem>
                    <SelectItem value="6-12">
                      {t("franchise.form.timeline.6_12")}
                    </SelectItem>
                    <SelectItem value=">12">
                      {t("franchise.form.timeline.12_plus")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.timeline && (
                  <p className="text-red-600 text-sm mt-1">{errors.timeline}</p>
                )}
              </div>

              <div className="col-span-1 md:col-span-2">
                <Label htmlFor="referral">{t("franchise.form.referral")}</Label>
                <Input
                  id="referral"
                  value={form.referral}
                  onChange={(e) =>
                    setForm({ ...form, referral: e.target.value })
                  }
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <Label htmlFor="message">{t("franchise.form.message")}</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </div>

              <div className="col-span-1 md:col-span-2 flex items-center space-x-3">
                <Checkbox
                  id="consent"
                  checked={form.consent}
                  onCheckedChange={(v) =>
                    setForm({ ...form, consent: Boolean(v) })
                  }
                />
                <Label htmlFor="consent">{t("franchise.form.consent")}</Label>
              </div>
              {errors.consent && (
                <div className="col-span-1 md:col-span-2">
                  <p className="text-red-600 text-sm">{errors.consent}</p>
                </div>
              )}

              <div className="col-span-1 md:col-span-2 flex items-center space-x-4">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-flat-blue text-flat-beige hover:bg-flat-dark px-8 py-6 text-lg rounded-full font-black tracking-wider uppercase"
                >
                  {submitting
                    ? language === "sr"
                      ? "Slanje..."
                      : "Submitting..."
                    : t("franchise.form.submit")}
                </Button>
              </div>

              {status === "success" && (
                <div className="col-span-1 md:col-span-2">
                  <Alert className="border-green-500/50">
                    <AlertDescription>
                      {t("franchise.success")}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
              {status === "error" && (
                <div className="col-span-1 md:col-span-2">
                  <Alert variant="destructive">
                    <AlertDescription>{t("franchise.error")}</AlertDescription>
                  </Alert>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-black text-flat-blue mb-6 text-center"
            style={{ fontFamily: "Bricolage Grotesque" }}
          >
            FAQ
          </h2>
          <Accordion type="single" collapsible>
            {faq.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger
                  aria-expanded={false}
                  className="text-left text-flat-blue font-bold"
                  style={{ fontFamily: "Bricolage Grotesque" }}
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent
                  className="text-flat-blue/80"
                  style={{ fontFamily: "Bricolage Grotesque" }}
                >
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
};

export default Franchise;

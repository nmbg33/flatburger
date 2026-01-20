import React, { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BurgerItem {
  id: string;
  nameKey: string;
  descriptionKey: string;
  price: number;
  imageUrl: string;
  orderUrl?: string;
}

interface AddonItem {
  id: string;
  key: string;
  price: number;
  orderUrl?: string;
}

const WOLT_URL = "https://wolt.com/sr/srb/belgrade/restaurant/flat-burger11";

const burgers: BurgerItem[] = [
  {
    id: "classic",
    nameKey: "burger.classic.name",
    descriptionKey: "burger.classic.description",
    price: 890,
    imageUrl: "/burgers/classic.png",
    orderUrl:
      "https://order.site/flat-burger/sr/srb/belgrade/restaurant/flat-burger-sf/classic-flat-itemid-301d8e18a7c9e1686a307b96",
  },
  {
    id: "pyro",
    nameKey: "burger.pyro.name",
    descriptionKey: "burger.pyro.description",
    price: 990,
    imageUrl: "/burgers/pyro.png",
    orderUrl:
      "https://order.site/flat-burger/sr/srb/belgrade/restaurant/flat-burger-sf/pyro-flat-itemid-e4deb8f82ea1080f2cc65cb5",
  },
  {
    id: "baconJam",
    nameKey: "burger.baconJam.name",
    descriptionKey: "burger.baconJam.description",
    price: 1190,
    imageUrl: "/burgers/bacon-jam.png",
    orderUrl:
      "https://order.site/flat-burger/sr/srb/belgrade/restaurant/flat-burger-sf/bacon-jam-flat-itemid-419b2975ceef76828e957fbb",
  },
  {
    id: "fancy",
    nameKey: "burger.fancy.name",
    descriptionKey: "burger.fancy.description",
    price: 1290,
    imageUrl: "/burgers/fancy.png",
    orderUrl:
      "https://order.site/flat-burger/sr/srb/belgrade/restaurant/flat-burger-sf/fancy-flat-itemid-fbfc69d70a7d75e2384d6517",
  },
  {
    id: "chicken",
    nameKey: "burger.chicken.name",
    descriptionKey: "burger.chicken.description",
    price: 990,
    imageUrl: "/burgers/chicken.png",
    orderUrl:
      "https://order.site/flat-burger/sr/srb/belgrade/restaurant/flat-burger-sf/chicken-flat-itemid-a72ed94f2b82ed62ca897fdb",
  },
  {
    id: "alabama",
    nameKey: "burger.alabama.name",
    descriptionKey: "burger.alabama.description",
    price: 1090,
    imageUrl: "/burgers/alabama.png",
    orderUrl:
      "https://order.site/flat-burger/sr/srb/belgrade/restaurant/flat-burger-sf/crispy-alabama-itemid-7d1b172c3277f34a3a5b6dc7",
  },
];

if (import.meta.env.DEV) {
  burgers.forEach((burger) => {
    if (!burger.imageUrl || !burger.imageUrl.startsWith("/")) {
      console.warn(
        `[menu] Missing or invalid imageUrl for "${burger.id}":`,
        burger.imageUrl,
      );
    }
  });
}

const addons: AddonItem[] = [
  { id: "pomfrit", key: "addon.pomfrit", price: 290, orderUrl: "https://order.site/flat-burger/sr/srb/belgrade/restaurant/flat-burger-sf/pomfrit-classic-200g-itemid-c7a12bd313ebc3c6a887de14" },
  { id: "batat", key: "addon.batat", price: 390, orderUrl: "https://order.site/flat-burger/sr/srb/belgrade/restaurant/flat-burger-sf/batat-200g-itemid-5b798290a80278f72427b085" },
  { id: "onionRings", key: "addon.onionRings", price: 350, orderUrl: "https://order.site/flat-burger/sr/srb/belgrade/restaurant/flat-burger-sf/onion-rings-8-komada-itemid-5902c9d7a51f168f460e102e" },
];

const BurgerCard: React.FC<{
  burger: BurgerItem;
  index: number;
  t: (key: string) => string;
}> = ({ burger, index, t }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();
  const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const entryInitial = { opacity: 0, y: shouldReduceMotion ? 0 : 10 };
  const entryAnimate = isInView ? { opacity: 1, y: 0 } : entryInitial;

  const cardVariants = shouldReduceMotion
    ? { rest: { y: 0, scale: 1 }, hover: { y: 0, scale: 1 }, tap: { scale: 1 } }
    : { rest: { y: 0, scale: 1 }, hover: { y: -4, scale: 1.015 }, tap: { scale: 0.99 } };

  const shadowVariants = shouldReduceMotion
    ? { rest: { boxShadow: "0 10px 40px -15px rgba(0, 0, 0, 0.1)" }, hover: { boxShadow: "0 10px 40px -15px rgba(0, 0, 0, 0.1)" } }
    : { rest: { boxShadow: "0 10px 40px -15px rgba(0, 0, 0, 0.1)" }, hover: { boxShadow: "0 18px 50px -25px rgba(28, 51, 195, 0.22)" } };

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-[80vw] sm:w-[320px] md:w-[340px] snap-center"
      initial={entryInitial}
      animate={entryAnimate}
      transition={{ duration: 0.6, delay: index * 0.06, ease: easing }}
    >
      <motion.div
        className="bg-white rounded-2xl overflow-hidden cursor-pointer relative mx-2"
        style={{ minHeight: "480px" }}
        variants={cardVariants}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap="tap"
        transition={{ duration: 0.22, ease: easing }}
      >
        {/* Shadow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none -z-10"
          variants={shadowVariants}
          transition={{ duration: 0.22, ease: easing }}
        />

        {/* Image */}
        <div className="h-48 md:h-52 overflow-hidden relative bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
          <img
            src={burger.imageUrl}
            alt={t(burger.nameKey)}
            className="max-w-full max-h-full object-contain"
            loading={index < 3 ? "eager" : "lazy"}
          />
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex flex-col flex-grow">
          <motion.h3
            className="text-xl md:text-2xl font-black text-flat-blue mb-3 tracking-tight"
            style={{ fontFamily: "Bricolage Grotesque" }}
            animate={shouldReduceMotion ? { x: 0 } : { x: 0 }}
          >
            {t(burger.nameKey)}
          </motion.h3>

          <p className="text-flat-blue/60 text-sm leading-relaxed mb-4 flex-grow line-clamp-3" style={{ fontFamily: "Bricolage Grotesque" }}>
            {t(burger.descriptionKey)}
          </p>

          <div className="mt-auto space-y-3">
            <motion.div>
              <span className="text-xl font-black text-flat-blue" style={{ fontFamily: "Bricolage Grotesque" }}>
                {burger.price} {t("price.currency")}
              </span>
            </motion.div>
            
            <motion.a
              href={burger.orderUrl ?? WOLT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-flat-blue text-flat-beige py-3 rounded-full font-bold tracking-wider uppercase text-center text-sm relative overflow-hidden group"
              style={{ fontFamily: "Bricolage Grotesque" }}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <span className="relative z-10">{t("cta.orderNow")}</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const UpdatedBurgerSection: React.FC = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-20%" });

  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.children[0]?.clientWidth || 340;
      sliderRef.current.scrollTo({ left: index * (slideWidth + 16), behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.children[0]?.clientWidth || 340;
      const newSlide = Math.round(sliderRef.current.scrollLeft / (slideWidth + 16));
      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < burgers.length) {
        setCurrentSlide(newSlide);
      }
    }
  };

  const title = t("menu.title");

  return (
    <section id="menu" ref={sectionRef} className="py-24 md:py-32 bg-flat-beige relative overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-0 w-px h-full bg-flat-blue/[0.03]" />
        <div className="absolute left-[90%] top-0 w-px h-full bg-flat-blue/[0.03]" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[8%] w-24 h-24 border border-flat-blue/[0.06] rounded-full" />
        <div className="absolute bottom-[15%] left-[5%] w-16 h-16 border border-flat-blue/[0.05] rotate-45" />
      </div>

      {/* Corner markers */}
      <motion.div
        className="absolute top-8 left-8"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing }}
        viewport={{ once: true }}
      >
        <div className="w-12 h-px bg-flat-blue/15" />
        <div className="w-px h-12 bg-flat-blue/15" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div ref={titleRef} className="mb-16 md:mb-20">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easing }}
          >
            <div className="w-10 h-px bg-flat-blue/30" />
            <span className="text-flat-blue/40 text-[10px] font-bold tracking-[0.4em] uppercase">Menu</span>
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h2
              className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-black text-flat-blue leading-[0.85] tracking-tighter"
              style={{ fontFamily: "Bricolage Grotesque" }}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: easing }}
            >
              {title}
            </motion.h2>
          </div>
          
          <motion.p
            className="mt-4 text-flat-blue/50 text-sm md:text-base tracking-wide max-w-md"
            style={{ fontFamily: "Bricolage Grotesque" }}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: easing }}
          >
            {t("menu.subtitle")}
          </motion.p>
        </motion.div>

        {/* Slider */}
        <div className="relative mb-16">
          {/* Nav arrows */}
          <motion.button
            onClick={() => { const n = Math.max(0, currentSlide - 1); setCurrentSlide(n); scrollToSlide(n); }}
            disabled={currentSlide === 0}
            className={`hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border-2 border-flat-blue/20 bg-flat-beige ${currentSlide === 0 ? 'opacity-30' : 'opacity-100'}`}
            whileHover={!shouldReduceMotion && currentSlide !== 0 ? { scale: 1.03, borderColor: "rgba(28, 51, 195, 0.5)" } : {}}
            whileTap={!shouldReduceMotion && currentSlide !== 0 ? { scale: 0.98 } : {}}
          >
            <ChevronLeft className="text-flat-blue" size={20} />
          </motion.button>
          
          <motion.button
            onClick={() => { const n = Math.min(burgers.length - 1, currentSlide + 1); setCurrentSlide(n); scrollToSlide(n); }}
            disabled={currentSlide === burgers.length - 1}
            className={`hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border-2 border-flat-blue/20 bg-flat-beige ${currentSlide === burgers.length - 1 ? 'opacity-30' : 'opacity-100'}`}
            whileHover={!shouldReduceMotion && currentSlide !== burgers.length - 1 ? { scale: 1.03, borderColor: "rgba(28, 51, 195, 0.5)" } : {}}
            whileTap={!shouldReduceMotion && currentSlide !== burgers.length - 1 ? { scale: 0.98 } : {}}
          >
            <ChevronRight className="text-flat-blue" size={20} />
          </motion.button>

          {/* Cards */}
          <motion.div
            ref={sliderRef}
            className="flex gap-4 py-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch", paddingLeft: "max(1rem, calc((100vw - 1200px) / 2))", paddingRight: "max(1rem, calc((100vw - 1200px) / 2))" }}
            onScroll={handleScroll}
          >
            {burgers.map((burger, index) => (
              <BurgerCard
                key={burger.id}
                burger={burger}
                index={index}
                t={t}
              />
            ))}
          </motion.div>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-3">
            {burgers.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => { setCurrentSlide(index); scrollToSlide(index); }}
                className="p-1"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full"
                  animate={{ 
                    backgroundColor: currentSlide === index ? "#1C33C3" : "rgba(28, 51, 195, 0.2)",
                    scale: currentSlide === index ? 1.5 : 1 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6, ease: easing }}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-black text-flat-blue mb-8 tracking-tight"
            style={{ fontFamily: "Bricolage Grotesque" }}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing }}
          >
            {t("menu.addOns")}
          </motion.h3>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto mb-16">
            {addons.map((addon, i) => (
              <motion.a
                key={addon.id}
                className="bg-transparent border-2 border-flat-blue/20 text-flat-blue px-6 py-3 rounded-full cursor-pointer relative overflow-hidden group"
                href={addon.orderUrl ?? WOLT_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: easing }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -2, borderColor: "#1C33C3", backgroundColor: "#1C33C3", color: "#FEEBCB" }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
              >
                <span className="font-bold text-sm tracking-wider" style={{ fontFamily: "Bricolage Grotesque" }}>
                  {t(addon.key)} — {addon.price} {t("price.currency")}
                </span>
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href={WOLT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-flat-blue text-flat-beige px-10 md:px-14 py-4 md:py-5 rounded-full font-bold tracking-wider uppercase text-sm md:text-base relative overflow-hidden group"
            style={{ fontFamily: "Bricolage Grotesque" }}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: easing }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
            <span className="relative z-10">{t("menu.seeMenu")}</span>
            <span className="relative z-10">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

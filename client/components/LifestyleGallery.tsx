import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const galleryImages = [
  "/gallery/DSC_2577.JPEG",
  "/gallery/DSC_2662.JPEG",
  "/gallery/DSC_2684.JPEG",
  "/gallery/DSC_2695.JPEG",
  "/gallery/DSC_2698.JPEG",
  "/gallery/IMG_1630.JPG",
  "/gallery/IMG_1632.JPG",
  "/gallery/IMG_1642.JPG",
  "/gallery/IMG_1644.JPG",
];

export const LifestyleGallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 md:py-32 bg-flat-beige relative overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-0 w-px h-full bg-flat-blue/[0.03]" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-flat-blue/[0.02]" />
        <div className="absolute left-[90%] top-0 w-px h-full bg-flat-blue/[0.03]" />
      </div>

      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-[15%] right-[10%] w-24 h-24 border border-flat-blue/[0.06] rounded-full pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-[20%] left-[5%] w-16 h-16 border border-flat-blue/[0.05] rotate-45 pointer-events-none"
        animate={{ rotate: [45, 135, 45] }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Corner markers */}
      <motion.div 
        className="absolute top-8 left-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="w-12 h-px bg-flat-blue/15"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ originX: 0 }}
        />
        <motion.div 
          className="w-px h-12 bg-flat-blue/15"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ originY: 0 }}
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div ref={titleRef} className="mb-14 md:mb-20">
          <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isTitleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-10 h-px bg-flat-blue/30" />
            <span 
              className="text-flat-blue/40 text-[10px] font-bold tracking-[0.4em] uppercase"
              style={{ fontFamily: "Bricolage Grotesque" }}
            >
              #FlatBurgerBG
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-black text-flat-blue leading-[0.85] tracking-tighter"
              style={{ fontFamily: "Bricolage Grotesque" }}
              initial={{ y: "100%" }}
              animate={isTitleInView ? { y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              THE VIBES
            </motion.h2>
          </div>

          <motion.p
            className="mt-4 text-flat-blue/50 text-base md:text-lg max-w-lg leading-relaxed"
            style={{ fontFamily: "Bricolage Grotesque" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Belgrade Design District. Late nights. Good company. Better burgers.
          </motion.p>
        </motion.div>

        {/* Gallery Grid - Simple and Clean */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((src, index) => (
            <GalleryImage 
              key={index}
              src={src}
              index={index}
              isHovered={hoveredIndex === index}
              isAnyHovered={hoveredIndex !== null}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div 
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Divider */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-16 md:w-24 h-px bg-flat-blue/20" />
            <span className="text-flat-blue/30 text-[10px] tracking-[0.3em] uppercase">Follow Us</span>
            <div className="w-16 md:w-24 h-px bg-flat-blue/20" />
          </div>

          <motion.a
            href="https://www.instagram.com/flatburger.bg/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-flat-blue text-flat-beige px-10 py-4 rounded-full font-bold tracking-wider uppercase text-sm relative overflow-hidden group"
            style={{ fontFamily: "Bricolage Grotesque" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="relative z-10">@flatburgerbg</span>
            <motion.span 
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// Separate component for each gallery image
const GalleryImage: React.FC<{
  src: string;
  index: number;
  isHovered: boolean;
  isAnyHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ src, index, isHovered, isAnyHovered, onMouseEnter, onMouseLeave }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [loaded, setLoaded] = useState(false);

  // Vary heights for visual interest
  const heights = [
    "aspect-[4/5]",   // tall
    "aspect-square",  // square
    "aspect-[3/4]",   // medium
    "aspect-[3/4]",   // medium
    "aspect-[4/5]",   // tall
    "aspect-square",  // square
    "aspect-[4/5]",   // tall
    "aspect-[3/4]",   // medium
    "aspect-square",  // square
  ];

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-xl cursor-pointer ${heights[index]}`}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { 
        opacity: isAnyHovered && !isHovered ? 0.5 : 1, 
        y: 0, 
        scale: 1 
      } : {}}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.08, 
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.25 }
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      {/* Background placeholder */}
      <div className="absolute inset-0 bg-flat-blue/10" />
      
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-flat-blue/15 to-flat-blue/5 animate-pulse" />
      )}

      {/* Image */}
      <motion.img
        src={src}
        alt={`Flat Burger lifestyle ${index + 1}`}
        loading={index < 6 ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-flat-blue/60 via-flat-blue/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner brackets */}
      <motion.div
        className="absolute inset-3 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-flat-beige/80" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-flat-beige/80" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-flat-beige/80" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-flat-beige/80" />
      </motion.div>

      {/* Image number */}
      <motion.div
        className="absolute bottom-4 left-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-flat-beige/70 text-xs font-mono tracking-wider">
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Instagram tag */}
      <motion.div
        className="absolute bottom-4 right-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <span 
          className="text-flat-beige text-xs font-bold tracking-wide"
          style={{ fontFamily: "Bricolage Grotesque" }}
        >
          @flatburgerbg
        </span>
      </motion.div>

      {/* Shadow on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(28, 51, 195, 0.25)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

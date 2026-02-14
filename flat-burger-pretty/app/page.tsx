import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { MarqueeSection } from "./components/MarqueeSection";
import { BentoMenu } from "./components/BentoMenu";
import { Statement } from "./components/Statement";
import { LocationsSection } from "./components/LocationsSection";
import { FooterReveal } from "./components/FooterReveal";
import { CtaSection } from "./components/CtaSection";
import { StorySection } from "./components/StorySection";
import { OrderMarquee } from "./components/OrderMarquee";
import { GallerySection } from "./components/GallerySection";

export default function Home() {
  return (
    <div className="bg-cream text-ink">
      <SiteHeader />
      <main>
        <Hero />
        <MarqueeSection />
        <BentoMenu />
        <Statement />
        <StorySection />
        <GallerySection />
        <LocationsSection />
        <OrderMarquee />
        <CtaSection />
        <FooterReveal />
      </main>
    </div>
  );
}

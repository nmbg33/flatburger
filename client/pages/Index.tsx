import React from "react";
import { BouncingStickerHero } from "../components/BouncingStickerHero";
import { IconsScrollSection } from "../components/IconsScrollSection";
import { UpdatedAboutSection } from "../components/UpdatedAboutSection";
import { UpdatedBurgerSection } from "../components/UpdatedBurgerSection";
import { UrbanStickerWall } from "../components/UrbanStickerWall";
import { TestSection } from "../components/TestSection";

export default function Index() {
  return (
    <div className="w-full">
      <BouncingStickerHero />
      <div className="bg-red-500 text-white py-20 text-center">
        <h2 className="text-6xl font-black">SIMPLE TEST</h2>
        <p className="text-2xl">This should show after hero</p>
      </div>
      <IconsScrollSection />
      <UpdatedAboutSection />
      <UrbanStickerWall />
      <UpdatedBurgerSection />
    </div>
  );
}

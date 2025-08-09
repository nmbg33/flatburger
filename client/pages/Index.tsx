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
      <TestSection />
      <IconsScrollSection />
      <UpdatedAboutSection />
      <UrbanStickerWall />
      <UpdatedBurgerSection />
    </div>
  );
}

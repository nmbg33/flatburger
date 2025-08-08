import React from "react";
import { BouncingStickerHero } from "../components/BouncingStickerHero";
import { IconsScrollSection } from "../components/IconsScrollSection";
import { UpdatedAboutSection } from "../components/UpdatedAboutSection";
import { UpdatedBurgerSection } from "../components/UpdatedBurgerSection";
import { UrbanStickerWall } from "../components/UrbanStickerWall";

export default function Index() {
  return (
    <>
      <BouncingStickerHero />
      <IconsScrollSection />
      <UpdatedAboutSection />
      <UrbanStickerWall />
      <UpdatedBurgerSection />
    </>
  );
}

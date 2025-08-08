import React from 'react';
import { NewHeroSection } from '../components/NewHeroSection';
import { IconsScrollSection } from '../components/IconsScrollSection';
import { UpdatedAboutSection } from '../components/UpdatedAboutSection';
import { UpdatedBurgerSection } from '../components/UpdatedBurgerSection';

export default function Index() {
  return (
    <>
      <NewHeroSection />
      <IconsScrollSection />
      <UpdatedAboutSection />
      <UpdatedBurgerSection />
    </>
  );
}

import React from 'react';
import { PrettyPattyStyleHero } from '../components/PrettyPattyStyleHero';
import { IconsScrollSection } from '../components/IconsScrollSection';
import { PrettyPattyStyleAbout } from '../components/PrettyPattyStyleAbout';
import { PrettyPattyStyleBurgers } from '../components/PrettyPattyStyleBurgers';

export default function Index() {
  return (
    <>
      <PrettyPattyStyleHero />
      <IconsScrollSection />
      <PrettyPattyStyleAbout />
      <PrettyPattyStyleBurgers />
    </>
  );
}

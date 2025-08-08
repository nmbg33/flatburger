import React from 'react';
import { CleanHero } from '../components/CleanHero';
import { IconsScrollSection } from '../components/IconsScrollSection';
import { CleanAbout } from '../components/CleanAbout';
import { CleanMenu } from '../components/CleanMenu';

export default function Index() {
  return (
    <>
      <CleanHero />
      <IconsScrollSection />
      <CleanAbout />
      <CleanMenu />
    </>
  );
}

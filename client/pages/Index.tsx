import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { MenuSection } from '../components/MenuSection';

export default function Index() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MenuSection />
    </>
  );
}

import React from 'react';
import { PrettyPattyHero } from '../components/PrettyPattyHero';
import { PrettyPattyAbout } from '../components/PrettyPattyAbout';
import { PrettyPattyMenu } from '../components/PrettyPattyMenu';

export default function Index() {
  return (
    <>
      <PrettyPattyHero />
      <PrettyPattyAbout />
      <PrettyPattyMenu />
    </>
  );
}

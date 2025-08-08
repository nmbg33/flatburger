import React from 'react';
import { CleanHero } from '../components/CleanHero';
import { CleanAbout } from '../components/CleanAbout';
import { CleanMenu } from '../components/CleanMenu';

export default function Index() {
  return (
    <>
      <CleanHero />
      <CleanAbout />
      <CleanMenu />
    </>
  );
}

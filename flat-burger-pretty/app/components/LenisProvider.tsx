"use client";

import React from "react";
import { ReactLenis } from "lenis/react";

export const LenisProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};

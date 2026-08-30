"use client";

import { Player } from "@remotion/player";
import { ArchitecturalHero } from "@/remotion/ArchitecturalHero";

export function HeroMotionPlayer() {
  return (
    <div className="hero-motion" aria-hidden="true">
      <Player
        component={ArchitecturalHero}
        durationInFrames={480}
        compositionWidth={1600}
        compositionHeight={1000}
        fps={30}
        autoPlay
        loop
        initiallyMuted
        controls={false}
        acknowledgeRemotionLicense
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

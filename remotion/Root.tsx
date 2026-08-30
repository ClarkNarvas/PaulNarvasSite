import { Composition } from "remotion";
import { ArchitecturalHero } from "./ArchitecturalHero";

export function RemotionRoot() {
  return (
    <Composition
      id="ArchitecturalHero"
      component={ArchitecturalHero}
      durationInFrames={480}
      fps={30}
      width={1600}
      height={1000}
    />
  );
}

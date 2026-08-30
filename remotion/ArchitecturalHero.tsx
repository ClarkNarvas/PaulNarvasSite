import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const frames = [
  { src: "/media/Waverly-thumb.png", label: "Waverley / mixed-use" },
  { src: "/media/merywalksthumb.png", label: "Merrywalks / regeneration" },
  { src: "/media/sgthumb.png", label: "St George’s / extension" },
  { src: "/media/newark.png", label: "Newark / modular living" }
];

export function ArchitecturalHero() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const section = durationInFrames / frames.length;

  return (
    <AbsoluteFill style={{ backgroundColor: "#282f35", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          opacity: 0.2,
          backgroundImage:
            "linear-gradient(rgba(223,230,235,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(223,230,235,.22) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }}
      />
      {frames.map((item, index) => {
        const local = frame - index * section;
        const entrance = spring({ fps, frame: local, config: { damping: 18, stiffness: 90 } });
        const exit = interpolate(local, [section - 24, section], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const opacity = Math.max(0, entrance * exit);
        const drift = interpolate(local, [0, section], [36, -36], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

        return (
          <AbsoluteFill key={item.src} style={{ opacity }}>
            <div
              style={{
                position: "absolute",
                inset: "9% 7% 13% 28%",
                overflow: "hidden",
                borderRadius: 8,
                transform: `translate3d(${drift}px, 0, 0) scale(${0.985 + entrance * 0.015})`
              }}
            >
              <Img
                src={staticFile(item.src)}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(.78) contrast(1.04)" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(40,47,53,.2), transparent 55%)" }} />
            </div>
            <div
              style={{
                position: "absolute",
                left: "7%",
                bottom: "8%",
                color: "#dfe6eb",
                fontFamily: "Inter, sans-serif",
                fontSize: 17,
                letterSpacing: ".14em",
                textTransform: "uppercase"
              }}
            >
              {String(index + 1).padStart(2, "0")} — {item.label}
            </div>
          </AbsoluteFill>
        );
      })}
      <div style={{ position: "absolute", left: "7%", top: "9%", width: 56, height: 1, background: "#dfe6eb" }} />
      <div style={{ position: "absolute", left: "7%", top: "9%", width: 1, height: 56, background: "#dfe6eb" }} />
      <div style={{ position: "absolute", right: "7%", bottom: "9%", width: 56, height: 1, background: "#dfe6eb" }} />
      <div style={{ position: "absolute", right: "7%", bottom: "9%", width: 1, height: 56, background: "#dfe6eb" }} />
    </AbsoluteFill>
  );
}

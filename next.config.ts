import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["renaissance.tailb913b2.ts.net"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/profile", permanent: true },
      { source: "/workingdrawings/index.html", destination: "/work", permanent: true },
      { source: "/freelancework/index.html", destination: "/work", permanent: true },
      { source: "/photoshoprendering.html", destination: "/work/architectural-visualisations", permanent: true },
      { source: "/sketchuprendering.html", destination: "/work/st-georges-church", permanent: true },
      { source: "/revitrendering.html", destination: "/work/hotel-angola", permanent: true },
      { source: "/conceptualdesign.html", destination: "/work/architectural-visualisations", permanent: true }
    ];
  }
};

export default nextConfig;

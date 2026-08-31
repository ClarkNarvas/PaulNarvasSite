import type { NextConfig } from "next";

const imageNoIndexHeader = [{ key: "X-Robots-Tag", value: "noindex" }];
const indexablePersonalMedia = [
  "/media/paul-portrait.png",
  "/media/paul-studio.jpg",
  "/media/paul.png"
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["renaissance.tailb913b2.ts.net"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      // Project media stays available to visitors while its original and
      // Next.js-optimised URLs are excluded from image search indexes.
      { source: "/documents/:path*", headers: imageNoIndexHeader },
      { source: "/media/:path*", headers: imageNoIndexHeader },
      { source: "/_next/image", headers: imageNoIndexHeader },
      ...indexablePersonalMedia.map((source) => ({
        source,
        headers: [{ key: "X-Robots-Tag", value: "all" }]
      }))
    ];
  },
  async redirects() {
    return [
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/profile", permanent: true },
      { source: "/workingdrawings", destination: "/#work", permanent: true },
      { source: "/workingdrawings/index.html", destination: "/#work", permanent: true },
      { source: "/freelancework", destination: "/#work", permanent: true },
      { source: "/freelancework/index.html", destination: "/#work", permanent: true },
      { source: "/workingdrawings/projects/gainsborough.html", destination: "/work/gainsborough", permanent: true },
      { source: "/workingdrawings/projects/waverly.html", destination: "/work/waverley", permanent: true },
      { source: "/workingdrawings/projects/merrywalks.html", destination: "/work/merrywalks", permanent: true },
      { source: "/workingdrawings/projects/former-derbyshire-times.html", destination: "/work/former-derbyshire-times", permanent: true },
      { source: "/workingdrawings/projects/greatgilling.html", destination: "/work/great-gilling", permanent: true },
      { source: "/workingdrawings/projects/meadowgrange.html", destination: "/work/meadow-grange-home", permanent: true },
      { source: "/workingdrawings/projects/ryecroftglen.html", destination: "/work/ryecroft-glen", permanent: true },
      { source: "/workingdrawings/projects/moorsidefarm.html", destination: "/work/moorside-farm", permanent: true },
      { source: "/freelancework/projects/69bawtry.html", destination: "/work/69-bawtry-road", permanent: true },
      { source: "/freelancework/projects/barlow.html", destination: "/work/barlow", permanent: true },
      { source: "/freelancework/projects/gym.html", destination: "/work/home-gym", permanent: true },
      { source: "/freelancework/projects/phome.html", destination: "/work/home-renovation", permanent: true },
      { source: "/photoshoprendering.html", destination: "/work/architectural-visualisations", permanent: true },
      { source: "/sketchuprendering.html", destination: "/work/st-georges-church", permanent: true },
      { source: "/revitrendering.html", destination: "/work/hotel-angola", permanent: true },
      { source: "/conceptualdesign.html", destination: "/work/architectural-visualisations", permanent: true }
    ];
  }
};

export default nextConfig;

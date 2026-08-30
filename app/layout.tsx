import type { Metadata, Viewport } from "next";
import { Ancizar_Serif, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { SiteAtmosphere } from "@/components/SiteAtmosphere";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const ancizar = Ancizar_Serif({ subsets: ["latin"], variable: "--font-ancizar", display: "swap", adjustFontFallback: false });

export const metadata: Metadata = {
  metadataBase: new URL("https://paulnarvas.com"),
  title: { default: "Paul Narvas — Design Manager & Architectural Technologist", template: "%s — Paul Narvas" },
  description: "Selected architecture, technical design, design management and visualisation work by Sheffield-based Paul Narvas.",
  openGraph: {
    title: "Paul Narvas — Design Manager & Architectural Technologist",
    description: "Selected architecture, technical design and visualisation work.",
    url: "https://paulnarvas.com",
    siteName: "Paul Narvas",
    images: [{ url: "/media/Waverly-thumb.png", width: 881, height: 573 }],
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#282f35",
  colorScheme: "light dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${ancizar.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteAtmosphere />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

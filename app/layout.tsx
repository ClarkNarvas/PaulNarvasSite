import type { Metadata, Viewport } from "next";
import { Ancizar_Serif, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SiteAtmosphere } from "@/components/SiteAtmosphere";
import { SiteHeader } from "@/components/SiteHeader";
import { globalStructuredData } from "@/lib/structuredData";
import { SITE_DESCRIPTION, SITE_NAME, SITE_ROOT, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const ancizar = Ancizar_Serif({ subsets: ["latin"], variable: "--font-ancizar", display: "swap", adjustFontFallback: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_ROOT }],
  creator: SITE_NAME,
  title: { default: SITE_TITLE, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_ROOT },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_ROOT,
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION
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
        <JsonLd data={globalStructuredData} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteAtmosphere />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

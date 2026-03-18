import type { Metadata, Viewport } from "next";
import { Geist_Mono, Sora, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import ThemeProviderWithMeta from "../lib/provider";
import Link from "next/link";
import Circle from "@/components/circle";
import { getAbsoluteUrl, getSiteUrl, SITE_CONFIG } from "@/lib/seo/site";
import JsonLd from "@/components/json-ld";
import { siteSchema } from "@/schema/site-schema";
import SmoothScroll from "@/components/smooth-scroll";
import { Analytics } from "@vercel/analytics/next";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

const geist = Sora({
  subsets: ["latin"],
  variable: "--font-paragraph",
  weight: ["400", "500", "600", "700", "300"],
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.BING_SITE_VERIFICATION;

const verification: NonNullable<Metadata["verification"]> = {
  ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
  ...(bingSiteVerification ? { other: { "msvalidate.01": bingSiteVerification } } : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    template: `%s | ${SITE_CONFIG.shortName}`,
    default: SITE_CONFIG.shortName,
  },
  applicationName: SITE_CONFIG.siteName,
  description: SITE_CONFIG.defaultDescription,
  keywords: ["Software Engineer", "Web Developer", "Open Source"],
  authors: [{ name: SITE_CONFIG.authorName, url: getAbsoluteUrl("/") }],
  creator: SITE_CONFIG.authorName,
  publisher: SITE_CONFIG.authorName,
  alternates: {
    canonical: getAbsoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
  },
  verification,
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.defaultDescription,
    url: getAbsoluteUrl("/"),
    siteName: SITE_CONFIG.siteName,
    locale: SITE_CONFIG.locale,
    images: [
      {
        url: getAbsoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.siteName,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.defaultDescription,
    creator: SITE_CONFIG.twitterHandle,
    images: [getAbsoluteUrl("/opengraph-image")],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${geist.variable} ${openSans.variable} bg-(background:--background) text-(color:--foreground) dark:bg-(background:--background-dark) dark:text-(color:--foreground-dark) antialiased`}
      >
        <SmoothScroll />
        <JsonLd id="global-site-schema" data={siteSchema} />
        <div className="min-h-screen max-h-[150vh] w-full relative">
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010540 100%)",
            }}
          />
          <div className="relative md:pt-20 z-10">
            <Analytics />
            <ThemeProviderWithMeta>
              <div className="max-w-screen-md  mx-auto">
                <a
                  href="#content"
                  className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-amber-500 focus:text-white focus:z-50 focus-visible:focus:ring-2 focus-visible:focus:ring-white"
                >
                  Skip to content
                </a>
                <main id="content" tabIndex={-1} className="focus:outline-none min-h-screen">
                  <Navbar />
                  <div className="p-4">{children}</div>
                </main>
                <footer className="text-xs px-4 space-y-4 my-10 text-stone-500" role="contentinfo">
                  <div className="w-full relative my-2">
                    <hr
                      className="w-full border-stone-200 dark:border-stone-700"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden"
                      aria-hidden="true"
                    >
                      <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-stone-500 dark:via-stone-400 to-transparent animate-shootingStar"></div>
                    </div>
                  </div>
                  <div className="flex items-center mt-6 gap-2 justify-between">
                    <span className="space-y-4 flex flex-col gap-2">
                      <Link
                        className="font-extrabold text-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded px-1"
                        href="/"
                        aria-label="Home"
                      >
                        エバンズ
                      </Link>
                      <p>&copy; {currentYear} Evans Elabo | All rights reserved</p>
                    </span>
                    <Circle />
                  </div>
                </footer>
              </div>
            </ThemeProviderWithMeta>
          </div>
        </div>
      </body>
    </html>
  );
}

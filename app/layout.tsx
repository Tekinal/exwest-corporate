import WebsiteAdviser from "@/components/WebsiteAdviser";
import type { Metadata } from "next";
import { headers } from "next/headers";

import "./globals.css";
import "./commercial.css";
import "./corporate.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.exwest.de"),
  applicationName: "Exwest",
  icons: { icon: "/favicon.svg" },
  manifest: "/site.webmanifest",
  openGraph: { images: [{ url: "/exwest-og.png", width: 1200, height: 630, alt: "Exwest — International Commerce. Powered by Intelligence." }] },
  twitter: { images: ["/exwest-og.png"] },
  robots:
    process.env.NEXT_PUBLIC_SITE_ENV === "preview" ||
    process.env.CONTEXT === "deploy-preview" ||
    process.env.CONTEXT === "branch-deploy"
      ? { index: false, follow: false }
      : undefined,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-exwest-locale");
  const locale = requestedLocale === "en" || requestedLocale === "tr" ? requestedLocale : "de";

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          {locale === "de" ? "Zum Inhalt" : locale === "tr" ? "İçeriğe geç" : "Skip to content"}
        </a>
        {children}
        {process.env.CIE_WEBSITE_ADVISER_ENABLED === "1" ? <WebsiteAdviser /> : null}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { headers } from "next/headers";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://exwest.de"),
  applicationName: "Exwest",
  icons: { icon: "/favicon.svg" },
  manifest: "/site.webmanifest",
  openGraph: { images: [{ url: "/exwest-og.png", width: 1200, height: 630, alt: "Exwest — International Commerce. Powered by Intelligence." }] },
  twitter: { images: ["/exwest-og.png"] },
  robots:
    process.env.CONTEXT === "deploy-preview" || process.env.CONTEXT === "branch-deploy"
      ? { index: false, follow: false }
      : undefined,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-exwest-locale") === "en" ? "en" : "de";

  return (
    <html lang={locale}>
      <body>
        <a className="skip-link" href="#main-content">
          {locale === "de" ? "Zum Inhalt" : "Skip to content"}
        </a>
        {children}
      </body>
    </html>
  );
}

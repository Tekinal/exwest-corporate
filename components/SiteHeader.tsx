"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { BrandMark } from "@/components/BrandMark";
import { localizePath, type Locale } from "@/lib/i18n";

type HeaderContent = {
  nav: ReadonlyArray<readonly [string, string]>;
  localeLabel: string;
  menuLabel: string;
};

export function SiteHeader({ locale, content }: { locale: Locale; content: HeaderContent }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(nextLocale: Locale) {
    document.cookie = `exwest_locale=${nextLocale}; Max-Age=15552000; Path=/; SameSite=Lax`;
    const nextPath = localizePath(pathname, nextLocale);
    router.push(nextPath || `/${nextLocale}`);
    setOpen(false);
  }

  return (
    <header className="site-header">
      <Link className="brand-link" href={`/${locale}`} aria-label={locale === "de" ? "Exwest Startseite" : locale === "tr" ? "Exwest ana sayfa" : "Exwest home"}>
        <BrandMark />
      </Link>
      <nav className="desktop-nav" aria-label={locale === "de" ? "Hauptnavigation" : locale === "tr" ? "Ana menü" : "Primary navigation"}>
        {content.nav.map(([label, href]) => (
          <a href={`/${locale}${href}`} key={href}>{label}</a>
        ))}
      </nav>
      <div className="header-actions">
        <div className="language-switcher" aria-label={content.localeLabel}>
          <button type="button" aria-pressed={locale === "de"} className={locale === "de" ? "active" : ""} onClick={() => switchLocale("de")}>DE</button>
          <span aria-hidden="true">|</span>
          <button type="button" aria-pressed={locale === "en"} className={locale === "en" ? "active" : ""} onClick={() => switchLocale("en")}>EN</button>
          <span aria-hidden="true">|</span>
          <button type="button" aria-pressed={locale === "tr"} className={locale === "tr" ? "active" : ""} onClick={() => switchLocale("tr")}>TR</button>
        </div>
        <button
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? (locale === "de" ? "Navigation schließen" : locale === "tr" ? "Menüyü kapat" : "Close navigation") : content.menuLabel}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
      <div className={`mobile-nav ${open ? "open" : ""}`} id="mobile-navigation">
        <nav aria-label={locale === "de" ? "Mobile Navigation" : locale === "tr" ? "Mobil menü" : "Mobile navigation"}>
          {content.nav.map(([label, href], index) => (
            <a href={`/${locale}${href}`} key={href} onClick={() => setOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

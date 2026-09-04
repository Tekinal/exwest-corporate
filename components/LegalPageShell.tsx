import type { ReactNode } from "react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { heroContent, type Locale } from "@/lib/i18n";
import { siteContent } from "@/lib/site-content";

export function LegalPageShell({ locale, eyebrow, title, lead, children }: {
  locale: Locale;
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <main id="main-content" className="site-shell legal-shell">
      <div className="legal-header"><SiteHeader locale={locale} content={heroContent[locale]} /></div>
      <header className="legal-hero">
        <div className="container">
          <p className="eyebrow"><span />{eyebrow}</p>
          <h1>{title}</h1>
          <p>{lead}</p>
        </div>
      </header>
      <article className="legal-content container">{children}</article>
      <SiteFooter locale={locale} copy={siteContent[locale].footer} />
    </main>
  );
}

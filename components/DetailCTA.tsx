import Link from "next/link";

import type { Locale } from "@/lib/i18n";

export function DetailCTA({ locale, title, text, label }: { locale: Locale; title: string; text: string; label: string }) {
  return (
    <section className="section detail-cta-section">
      <div className="container detail-cta">
        <div><span>EXWEST · COMMERCIAL CONVERSATION</span><h2>{title}</h2><p>{text}</p></div>
        <Link className="button primary" href={`/${locale}#contact`}>{label}<i aria-hidden="true">↗</i></Link>
      </div>
    </section>
  );
}

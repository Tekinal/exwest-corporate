import Link from "next/link";

import { BrandMark } from "@/components/BrandMark";
import type { Locale } from "@/lib/i18n";
import type { SiteCopy } from "@/lib/site-content";

export function SiteFooter({ locale, copy }: { locale: Locale; copy: SiteCopy["footer"] }) {
  const imprintPath = locale === "de" ? "/de/impressum" : locale === "tr" ? "/tr/kunye" : "/en/imprint";
  const privacyPath = locale === "de" ? "/de/datenschutz" : locale === "tr" ? "/tr/gizlilik" : "/en/privacy";
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link href={`/${locale}`}><BrandMark /></Link>
          <p>{copy.statement}</p>
          <a href="mailto:contact@exwest.de">contact@exwest.de</a>
        </div>
        {copy.columns.map((column) => (
          <div className="footer-column" key={column.title}>
            <h2>{column.title}</h2>
            {column.links.map(([label, href]) => <a href={`/${locale}${href}`} key={href}>{label}</a>)}
          </div>
        ))}
        <div className="footer-column">
          <h2>{copy.legal}</h2>
          <Link href={imprintPath}>{copy.imprint}</Link>
          <Link href={privacyPath}>{copy.privacy}</Link>
          <a href="https://exwestmodular.de" rel="noopener noreferrer">Exwest Modular ↗</a>
          <a href="https://realestate.exwest.de" rel="noopener noreferrer">Exwest Real Estate ↗</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Exwest GmbH</span><span>{copy.location}</span><span>Intelligence → Execution → Scale</span></div>
    </footer>
  );
}

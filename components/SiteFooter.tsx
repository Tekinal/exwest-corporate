import Link from 'next/link';
import {BrandMark} from './BrandMark';
import {ui,navGroups,shortLabel} from '@/lib/corporate';
import {localizedRoutes,type Locale} from '@/lib/i18n';
import type {SiteCopy} from '@/lib/site-content';
export function SiteFooter({locale}:{locale:Locale;copy?:SiteCopy['footer']}){
 const u=ui[locale];return <footer className="corp-footer"><div className="corp-wrap"><div className="corp-footer-intro"><Link href={`/${locale}`} aria-label="Exwest"><BrandMark/></Link><p>Exwest GmbH · Düsseldorf</p><a href="mailto:contact@exwest.de">contact@exwest.de</a></div><div className="corp-footer-links">{navGroups.map(([label,keys])=><section key={label}><h2>{u[label]}</h2>{keys.map(k=><a key={k} href={localizedRoutes[k][locale]}>{shortLabel(k,locale)}</a>)}</section>)}</div><div className="corp-footer-legal"><a href={localizedRoutes.pricing[locale]}>{u.pricing}</a><a href={localizedRoutes.docs[locale]}>{u.docs}</a><a href={localizedRoutes.imprint[locale]}>{u.imprint}</a><a href={localizedRoutes.privacy[locale]}>{u.privacy}</a><a href="https://exwestmodular.de">Exwest Modular ↗</a><a href="https://realestate.exwest.de">Exwest Real Estate ↗</a></div><p className="corp-footer-bottom">© {new Date().getFullYear()} Exwest GmbH · Königsallee 92a · 40212 Düsseldorf</p></div></footer>;
}

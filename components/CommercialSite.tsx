import Image from "next/image";
import Link from "next/link";
import { commercialCopy } from "@/lib/commercial-content";
import { formContent } from "@/lib/form-content";
import { heroContent, localizedRoutes, type Locale } from "@/lib/i18n";
import { siteContent } from "@/lib/site-content";
import { CommercialJourney, ShowroomDrawing } from "@/components/CommercialJourney";
import { CommercialLeadForm } from "@/components/CommercialLeadForm";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export function CommercialSite({ locale, overview = false }: { locale: Locale; overview?: boolean }) {
  const c = commercialCopy[locale];
  const title = overview ? c.cieHero : c.hero;
  const meta = overview ? c.metaCie : c.metaHome;
  const path = overview ? localizedRoutes.cie[locale] : localizedRoutes.home[locale];
  const origin = "https://www.exwest.de"; // Verified public apex -> www redirect, baseline 2026-10-11.
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", "@id": `${origin}/#organization`, name: "Exwest GmbH", url: origin, email: "contact@exwest.de", address: { "@type": "PostalAddress", streetAddress: "Königsallee 92a", postalCode: "40212", addressLocality: "Düsseldorf", addressCountry: "DE" } },
    { "@type": "WebSite", "@id": `${origin}/#website`, name: "Exwest", url: origin, inLanguage: ["de", "en", "tr"], publisher: { "@id": `${origin}/#organization` } },
    { "@type": "WebPage", "@id": `${origin}${path}#webpage`, url: `${origin}${path}`, name: meta, description: overview ? c.cieLead : c.lead, inLanguage: locale, isPartOf: { "@id": `${origin}/#website` } },
  ] };
  const capAnchors = ["signals", "strategy", "operations", "human-control"];
  return <main id="main-content" className={`site-shell commercial-v2 ${overview ? "commercial-overview" : "commercial-home"}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replaceAll("<", "\\u003c") }}/>
    <section className="v2-hero" id="top">
      <Image className="v2-hero-image" src="/exwest-commercial-operations.jpg" alt="" fill priority sizes="100vw"/>
      <div className="v2-hero-shade"/>
      <div className="v2-header-wrap"><SiteHeader locale={locale} content={heroContent[locale]}/></div>
      <div className="v2-hero-copy"><p className="v2-kicker">EXWEST / CIE</p><h1><span>{title[0]}</span><span>{title[1]}</span></h1><p className="v2-hero-lead">{overview ? c.cieLead : c.lead}</p><p className="v2-category">{c.category}</p><div className="v2-actions"><a className="v2-button v2-button-light" href="#demonstration">{c.demoCta}<span aria-hidden="true">↗</span></a><a className="v2-button v2-button-ghost" href={`/${locale}#contact`}>{c.contactCta}</a></div></div>
      <div className="v2-hero-bottom"><span>{c.principle}</span><span>{c.illustration}</span></div>
    </section>
    <section className="v2-section v2-demo-section" id="demonstration"><div className="v2-container"><CommercialJourney copy={c}/></div></section>
    <section className="v2-section v2-roles" id="responsibilities"><div className="v2-container"><div className="v2-section-heading"><p className="v2-kicker">CIE</p><h2>{c.rolesTitle}</h2><p>{c.rolesLead}</p></div><div className="role-grid">{c.roles.map((role,index)=><article key={role[0]}><span className="role-number">0{index+1}</span><h3>{role[0]}</h3><p>{role[1]}</p><a href={`${localizedRoutes.cie[locale]}#${capAnchors[[0,2,3][index]]}`}>{role[2]} <span aria-hidden="true">↗</span></a></article>)}</div></div></section>
    <section className="v2-section v2-platform" id="platform"><span id="cie"/><div className="v2-container"><div className="v2-section-heading"><p className="v2-kicker">AI COMMERCIAL OPERATING SYSTEM</p><h2>{c.platform}</h2><p>{c.platformLead}</p></div><div className="capability-grid">{c.capabilities.map((cap,index)=><article key={cap[0]} id={capAnchors[index]==="human-control" || capAnchors[index]==="strategy" ? undefined : capAnchors[index]}><span>0{index+1}</span><h3>{cap[0]}</h3><p>{cap[1]}</p></article>)}</div>{!overview && <Link className="v2-text-link" href={localizedRoutes.cie[locale]}>{c.overviewCta} <span aria-hidden="true">↗</span></Link>}</div></section>
    {overview && <>
      <section className="v2-section" id="lifecycle"><div className="v2-container"><div className="v2-section-heading"><p className="v2-kicker">CIE / 01 — 07</p><h2>{c.lifecycleTitle}</h2><p>{c.category}</p></div><ol className="lifecycle-grid">{c.lifecycle.map((step,index)=><li key={step}><span>0{index+1}</span><h3>{step}</h3><p>{c.lifecycleNotes[index]}</p></li>)}</ol></div></section>
      <section className="v2-section v2-strategy" id="strategy"><div className="v2-container v2-split"><div className="v2-section-heading"><p className="v2-kicker">COMMERCIAL STRATEGY</p><h2>{c.strategy}</h2><p>{c.strategyLead}</p></div><div className="business-rules">{c.rules.map((rule,index)=><div key={rule}><span>0{index+1}</span><strong>{rule}</strong></div>)}</div></div></section>
    </>}
    <section className="v2-section v2-control" id="human-control"><div className="v2-container v2-split"><div className="v2-section-heading"><p className="v2-kicker">CRM & HUMAN CONTROL</p><h2>{c.control}</h2><p>{c.controlLead}</p><ul className="control-points">{c.controlPoints.map(point=><li key={point}>{point}</li>)}</ul></div><figure className="human-review"><figcaption>{c.simulation}</figcaption><div className="review-header"><span>{c.controlLabel}</span><span>MOD / 001</span></div><p className="review-company">{c.company}</p><h3>{c.controlRequest}</h3><p>{c.controlCondition}</p><div className="review-decision">{c.controlDecision}<span aria-hidden="true">↗</span></div><p>{c.controlNext}</p><small>{c.controlNote}</small></figure></div></section>
    {!overview && <section className="v2-section v2-lifecycle-home"><div className="v2-container"><h2>{c.lifecycleTitle}</h2><ol>{c.lifecycle.map(step=><li key={step}>{step}</li>)}</ol><Link className="v2-text-link" href={`${localizedRoutes.cie[locale]}#lifecycle`}>{c.overviewCta} ↗</Link></div></section>}
    <section className="v2-section v2-status" id="status"><div className="v2-container"><div className="v2-section-heading"><p className="v2-kicker">CIE / {c.statuses[0][0]}</p><h2>{c.statusTitle}</h2><p>{c.statusLead}</p></div><div className="status-grid">{c.statuses.map(status=><article key={status[0]}><h3>{status[0]}</h3><p>{status[1]}</p></article>)}</div></div></section>
    <section className="v2-section v2-company" id="businesses"><div className="v2-container"><div className="v2-split"><div className="v2-section-heading"><p className="v2-kicker">EXWEST GMBH / DÜSSELDORF</p><h2>{c.companyTitle}</h2><p>{c.companyLead}</p></div><div className="company-visual"><ShowroomDrawing/><p>{c.simulation}</p></div></div><div className="company-factline"><strong>Exwest GmbH</strong><span>Königsallee 92a · 40212 Düsseldorf</span><span>HRB 104648</span><a href="mailto:contact@exwest.de">contact@exwest.de</a></div><div className="service-links">{(["trade","ecommerce","company"] as const).map((key,index)=><Link id={key === "trade" ? "trade" : key === "ecommerce" ? "ecommerce" : undefined} href={localizedRoutes[key][locale]} key={key}>{c.services[index]} <span aria-hidden="true">↗</span></Link>)}</div><div className="business-links"><p>{c.businesses}</p><a href="https://exwestmodular.de">{c.modular} ↗</a><a href="https://realestate.exwest.de">{c.estate} ↗</a></div></div></section>
    <section className="v2-section v2-faq" id="faq"><div className="v2-container v2-split"><div className="v2-section-heading"><p className="v2-kicker">CIE / FAQ</p><h2>{c.faqTitle}</h2></div><div>{c.faqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    <section className="v2-section v2-contact" id="contact"><div className="v2-container v2-split"><div className="v2-section-heading"><p className="v2-kicker">EXWEST / {c.nav[3]}</p><h2>{c.contactTitle}</h2><p>{c.contactLead}</p><a className="v2-text-link" href="mailto:contact@exwest.de">contact@exwest.de ↗</a></div>{overview ? <div className="contact-overview"><p>{c.contactLead}</p><Link className="v2-button v2-button-dark" href={`/${locale}#contact`}>{c.contactCta} ↗</Link></div> : <CommercialLeadForm locale={locale} copy={formContent[locale]} interestLabels={{"CIE Marketplace":"CIE"}}/>}</div></section>
    <SiteFooter locale={locale} copy={siteContent[locale].footer}/>
  </main>;
}

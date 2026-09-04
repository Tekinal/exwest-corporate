import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CIEIntelligenceFlow } from "@/components/CIEIntelligenceFlow";
import { CommercialSignalCard } from "@/components/CommercialSignalCard";
import { ContactIntent } from "@/components/ContactIntent";
import { ExwestOperatingModel } from "@/components/ExwestOperatingModel";
import { GlobalCommerceGraph } from "@/components/GlobalCommerceGraph";
import { GlobalCommercialNetwork } from "@/components/GlobalCommercialNetwork";
import { MarketplaceCommerceFlow } from "@/components/MarketplaceCommerceFlow";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SolutionVisual } from "@/components/SolutionVisual";
import { TradeExecutionFlow } from "@/components/TradeExecutionFlow";
import { heroContent, isLocale, locales, type Locale } from "@/lib/i18n";
import { siteContent } from "@/lib/site-content";

const metadataByLocale: Record<Locale, { title: string; description: string }> = {
  de: {
    title: "Exwest | Commercial Intelligence & International Commerce",
    description: "Exwest verbindet CIE Solutions, International Trade und E-Commerce, um kommerzielle Chancen zu erkennen, umzusetzen und zu skalieren.",
  },
  en: {
    title: "Exwest | Commercial Intelligence & International Commerce",
    description: "Exwest combines CIE Solutions, international trade and e-commerce to identify, execute and scale commercial opportunities.",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const meta = metadataByLocale[locale];
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${locale}`, languages: { de: "/de", en: "/en", "x-default": "/de" } },
    openGraph: {
      type: "website", locale: locale === "de" ? "de_DE" : "en_GB", alternateLocale: locale === "de" ? ["en_GB"] : ["de_DE"],
      url: `/${locale}`, siteName: "Exwest", title: meta.title, description: meta.description,
      images: [{ url: "/exwest-og.png", width: 1200, height: 630, alt: "Exwest — International Commerce. Powered by Intelligence." }],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: ["/exwest-og.png"] },
  };
}

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const hero = heroContent[locale];
  const copy = siteContent[locale];
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": "https://exwest.de/#organization", name: "Exwest GmbH", url: "https://exwest.de", email: "contact@exwest.de",
        address: { "@type": "PostalAddress", streetAddress: "Königsallee 92a", postalCode: "40212", addressLocality: "Düsseldorf", addressCountry: "DE" },
      },
      {
        "@type": "Service", "@id": `https://exwest.de/${locale}#cie-service`, name: "Exwest CIE Solutions", serviceType: "Commercial Intelligence",
        provider: { "@id": "https://exwest.de/#organization" }, description: metadataByLocale[locale].description,
      },
    ],
  };

  return (
    <main id="main-content" className="site-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <section className="hero" id="top">
        <SiteHeader locale={locale} content={hero} />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span />{hero.eyebrow}</p>
            <h1><span>{hero.titleTop}</span><span className="accent-line">{hero.titleBottom}</span></h1>
            <p className="hero-summary">{hero.summary}</p>
            <div className="hero-actions">
              <a className="button primary" href={`/${locale}#cie`}>{hero.primary}<span aria-hidden="true">↗</span></a>
              <a className="button secondary" href={`/${locale}#contact`}>{hero.secondary}<span aria-hidden="true">→</span></a>
            </div>
            <div className="hero-principle"><span>Intelligence</span><i aria-hidden="true" /><span>Execution</span><i aria-hidden="true" /><span>Scale</span></div>
          </div>
          <GlobalCommerceGraph labels={hero.signalLabels} locale={locale} />
        </div>
        <div className="hero-bottomline" aria-hidden="true"><span>01 / CIE</span><span>Düsseldorf · International Commerce</span></div>
      </section>

      <section className="section intro-section">
        <div className="container">
          <SectionHeading eyebrow={copy.intro.eyebrow} title={copy.intro.title} text={copy.intro.text} />
          <div className="pillar-grid">
            {copy.intro.pillars.map((pillar) => (
              <article className={pillar.index === "01" ? "primary-pillar" : ""} key={pillar.title}>
                <div className="pillar-top"><span>{pillar.index}</span><b>{pillar.role}</b></div>
                <h3>{pillar.title}</h3><p>{pillar.text}</p><div className="pillar-rule" aria-hidden="true"><i /><i /><i /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cie-section" id="cie">
        <div className="container">
          <div className="cie-heading-row">
            <SectionHeading eyebrow={copy.cie.eyebrow} title={copy.cie.title} text={copy.cie.text} invert />
            <aside className="governance-note"><span /><div><strong>{copy.cie.governanceTitle}</strong><p>{copy.cie.governanceText}</p></div></aside>
          </div>
          <CIEIntelligenceFlow copy={copy.cie} />
          <div className="signal-strip">
            <CommercialSignalCard label="SOURCE" value="Evidence context" tone="stone" />
            <CommercialSignalCard label="METHOD" value="Human-reviewed" tone="mint" />
            <CommercialSignalCard label="OUTPUT" value="Decision support" tone="amber" />
          </div>
        </div>
      </section>

      <section className="section solutions-section">
        <div className="container">
          <SectionHeading eyebrow={copy.solutions.eyebrow} title={copy.solutions.title} text={copy.solutions.text} />
          <div className="solution-grid">
            {copy.solutions.items.map((item, index) => (
              <article className="solution-card" key={item.title}>
                <div className="solution-index">{String(index + 1).padStart(2, "0")} / 04</div><SolutionVisual type={item.type} />
                <div className="solution-body"><h3>{item.title}</h3><p>{item.text}</p><span>{item.meta}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section trade-section" id="trade">
        <div className="container">
          <div className="split-heading">
            <SectionHeading eyebrow={copy.trade.eyebrow} title={copy.trade.title} text={copy.trade.text} />
            <div className="trade-capabilities">{copy.trade.capabilities.map((capability, index) => <span key={capability}><i>{String(index + 1).padStart(2, "0")}</i>{capability}</span>)}</div>
          </div>
          <TradeExecutionFlow stages={copy.trade.stages} />
          <p className="compliance-note"><span>i</span>{copy.trade.note}</p>
        </div>
      </section>

      <section className="section ecommerce-section" id="ecommerce">
        <div className="container">
          <div className="ecommerce-heading">
            <SectionHeading eyebrow={copy.ecommerce.eyebrow} title={copy.ecommerce.title} text={copy.ecommerce.text} invert />
            <div className="commerce-capability-cloud">{copy.ecommerce.capabilities.map((capability, index) => <span className={index % 3 === 0 ? "accent" : ""} key={capability}>{capability}</span>)}</div>
          </div>
          <MarketplaceCommerceFlow stages={copy.ecommerce.stages} ecosystems={copy.ecommerce.ecosystems} ecosystemLabel={copy.ecommerce.ecosystemsLabel} />
        </div>
      </section>

      <section className="section model-section" id="model">
        <div className="container"><SectionHeading eyebrow={copy.model.eyebrow} title={copy.model.title} text={copy.model.text} invert /><ExwestOperatingModel items={copy.model.items} /></div>
      </section>

      <section className="section global-section">
        <div className="container">
          <div className="global-copy-grid">
            <SectionHeading eyebrow={copy.global.eyebrow} title={copy.global.title} text={copy.global.text} />
            <dl className="global-facts"><div><dt>{copy.global.office}</dt><dd>{copy.global.officeValue}</dd></div><div><dt>{copy.global.coverage}</dt><dd>{copy.global.regions.join(" · ")}</dd></div></dl>
          </div>
          <GlobalCommercialNetwork regions={copy.global.regions} />
        </div>
      </section>

      <section className="section industries-section">
        <div className="container compact-grid">
          <SectionHeading eyebrow={copy.industries.eyebrow} title={copy.industries.title} text={copy.industries.text} />
          <div className="industry-list">{copy.industries.items.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><i aria-hidden="true">↗</i></div>)}</div>
        </div>
      </section>

      <section className="section portfolio-section" id="businesses">
        <div className="container">
          <SectionHeading eyebrow={copy.portfolio.eyebrow} title={copy.portfolio.title} text={copy.portfolio.text} />
          <div className="business-grid">
            {copy.portfolio.businesses.map((business, index) => (
              <article className={`business-card business-${index + 1}`} key={business.name}>
                <div className="business-visual" aria-hidden="true"><span>{index === 0 ? "MOD" : "RE"}</span><i /><i /><i /></div>
                <div className="business-copy"><p>{business.tag}</p><h3>{business.name}</h3><span>{business.text}</span><a href={business.href} rel="noopener noreferrer">{business.cta}<b aria-hidden="true">↗</b></a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section company-section" id="company">
        <div className="container company-grid">
          <SectionHeading eyebrow={copy.company.eyebrow} title={copy.company.title} text={copy.company.text} invert />
          <div className="principle-stack">{copy.company.principles.map((principle, index) => <div key={principle}><span>{String(index + 1).padStart(2, "0")}</span><strong>{principle}</strong></div>)}</div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container contact-grid">
          <div><SectionHeading eyebrow={copy.contact.eyebrow} title={copy.contact.title} text={copy.contact.text} /><div className="contact-identity"><span>EXWEST GMBH</span><strong>Düsseldorf</strong><a href="mailto:contact@exwest.de">contact@exwest.de</a></div></div>
          <ContactIntent intents={copy.contact.intents} cta={copy.contact.cta} subject={copy.contact.mailSubject} locale={locale} />
        </div>
      </section>

      <SiteFooter locale={locale} copy={copy.footer} />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AgenticDirectionTeaser } from "@/components/AgenticDirectionTeaser";
import { CIEIntelligenceFlow } from "@/components/CIEIntelligenceFlow";
import { CIEProductExperience } from "@/components/CIEProductExperience";
import { CommercialLeadForm } from "@/components/CommercialLeadForm";
import { CommercialSignalCard } from "@/components/CommercialSignalCard";
import { MarketplaceCommerceFlow } from "@/components/MarketplaceCommerceFlow";
import { MarketplaceDecisionGrid } from "@/components/MarketplaceDecisionGrid";
import { MarketplaceHeroVideo } from "@/components/MarketplaceHeroVideo";
import { MarketplaceSignalField } from "@/components/MarketplaceSignalField";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TradeExecutionFlow } from "@/components/TradeExecutionFlow";
import { detailContent } from "@/lib/detail-content";
import { formContent } from "@/lib/form-content";
import { homepageContent } from "@/lib/homepage-content";
import { heroContent, isLocale, locales, localizedRoutes, type Locale } from "@/lib/i18n";
import { siteContent } from "@/lib/site-content";

const metadataByLocale: Record<Locale, { title: string; description: string }> = {
  de: {
    title: "CIE Marketplace | Marktplatz- & Produktintelligenz | Exwest",
    description: "CIE Marketplace verbindet Produkt-, Preis-, Wettbewerbs-, Nachfrage-, Bestands-, Margen- und Channel-Signale für fundierte Marktplatzentscheidungen von Marken.",
  },
  en: {
    title: "CIE Marketplace | Marketplace & Product Intelligence | Exwest",
    description: "CIE Marketplace connects product, pricing, competitor, demand, inventory, margin and channel signals for stronger marketplace decisions by brands.",
  },
  tr: {
    title: "CIE Marketplace | Pazaryeri Zekâsı ve Büyüme | Exwest",
    description: "CIE Marketplace; markaların daha güçlü pazaryeri kararları verebilmesi için ürün, fiyat, rekabet, talep, stok, marj ve kanal sinyallerini birleştirir.",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const meta = metadataByLocale[locale];
  const image = `/${locale}/opengraph-image`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${locale}`, languages: { de: "/de", en: "/en", tr: "/tr", "x-default": "/de" } },
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : locale === "tr" ? "tr_TR" : "en_GB",
      alternateLocale: locale === "de" ? ["en_GB", "tr_TR"] : locale === "tr" ? ["de_DE", "en_GB"] : ["de_DE", "tr_TR"],
      url: `/${locale}`,
      siteName: "Exwest",
      title: meta.title,
      description: meta.description,
      videos: [{ url: "/cie-marketplace-hero.mp4", secureUrl: "/cie-marketplace-hero.mp4", type: "video/mp4", width: 1280, height: 800 }],
      images: [{ url: image, width: 1200, height: 630, alt: `${heroContent[locale].titleTop} ${heroContent[locale].titleBottom}` }],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [image] },
  };
}

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const hero = heroContent[locale];
  const copy = siteContent[locale];
  const home = homepageContent[locale];
  const leadForm = formContent[locale];
  const productExperience = detailContent.cie[locale].experience;
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "Corporation"], "@id": "https://exwest.de/#organization", name: "Exwest GmbH", url: "https://exwest.de", email: "contact@exwest.de",
        address: { "@type": "PostalAddress", streetAddress: "Königsallee 92a", postalCode: "40212", addressLocality: "Düsseldorf", addressCountry: "DE" },
        knowsAbout: ["CIE Marketplace", "Marketplace Intelligence", "Product Commercialization", "E-Commerce Growth", "International Trade", "Global Sourcing"],
      },
      { "@type": "WebSite", "@id": "https://exwest.de/#website", url: "https://exwest.de", name: "Exwest", publisher: { "@id": "https://exwest.de/#organization" }, inLanguage: ["de", "en", "tr"] },
      { "@type": "WebPage", "@id": `https://exwest.de/${locale}#webpage`, url: `https://exwest.de/${locale}`, name: metadataByLocale[locale].title, description: metadataByLocale[locale].description, inLanguage: locale, isPartOf: { "@id": "https://exwest.de/#website" }, primaryImageOfPage: { "@type": "ImageObject", url: `https://exwest.de/${locale}/opengraph-image` } },
      {
        "@type": "Service", "@id": `https://exwest.de/${locale}#cie-marketplace`, name: "CIE Marketplace", serviceType: "Marketplace and Commercial Intelligence",
        provider: { "@id": "https://exwest.de/#organization" }, description: metadataByLocale[locale].description,
      },
    ],
  };

  return (
    <main id="main-content" className="site-shell marketplace-home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replaceAll("<", "\\u003c") }} />

      <section className="hero marketplace-hero" id="top">
        <SiteHeader locale={locale} content={hero} />
        <div className="hero-inner marketplace-hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span />{hero.eyebrow}</p>
            <h1><span>{hero.titleTop}</span><span className="accent-line">{hero.titleBottom}</span></h1>
            <p className="hero-summary">{hero.summary}</p>
            <div className="hero-actions">
              <Link className="button primary" href={localizedRoutes.cie[locale]}>{hero.primary}<span aria-hidden="true">↗</span></Link>
              <a className="button secondary" href={`/${locale}#contact`}>{hero.secondary}<span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-principle"><span>{hero.principle[0]}</span><i aria-hidden="true" /><span>{hero.principle[1]}</span><i aria-hidden="true" /><span>{hero.principle[2]}</span></div>
          </div>
          <MarketplaceHeroVideo label={hero.visualLabel} caption={hero.visualCaption} />
        </div>
        <div className="hero-bottomline" aria-hidden="true"><span>01 / CIE MARKETPLACE</span><span>Düsseldorf · Marketplace Commerce</span></div>
      </section>

      <section className="section marketplace-problem-section">
        <div className="container marketplace-problem-grid">
          <SectionHeading eyebrow={home.problem.eyebrow} title={home.problem.title} text={home.problem.text} />
          <MarketplaceSignalField signals={home.problem.signals} fragmented={home.problem.fragmented} resolved={home.problem.resolved} />
        </div>
      </section>

      <section className="section cie-section marketplace-decision-layer" id="cie">
        <div className="container">
          <div className="cie-heading-row">
            <SectionHeading eyebrow={home.decisionLayer.eyebrow} title={home.decisionLayer.title} text={home.decisionLayer.text} invert />
            <aside className="governance-note"><span /><div><strong>{home.decisionLayer.governanceTitle}</strong><p>{home.decisionLayer.governanceText}</p></div></aside>
          </div>
          <CIEIntelligenceFlow copy={copy.cie} />
          <div className="signal-strip">
            <CommercialSignalCard label={copy.cie.signalStrip[0][0]} value={copy.cie.signalStrip[0][1]} tone="stone" />
            <CommercialSignalCard label={copy.cie.signalStrip[1][0]} value={copy.cie.signalStrip[1][1]} tone="mint" />
            <CommercialSignalCard label={copy.cie.signalStrip[2][0]} value={copy.cie.signalStrip[2][1]} tone="amber" />
          </div>
        </div>
      </section>

      <section className="section homepage-product-experience">
        <div className="container">
          <div className="product-experience-heading">
            <SectionHeading eyebrow={home.experience.eyebrow} title={home.experience.title} text={home.experience.text} />
            <Link className="text-link dark-link" href={localizedRoutes.cie[locale]}>{home.experience.cta}<span aria-hidden="true">↗</span></Link>
          </div>
          <CIEProductExperience copy={productExperience} />
        </div>
      </section>

      <section className="section marketplace-decisions-section">
        <div className="container">
          <SectionHeading eyebrow={home.decisions.eyebrow} title={home.decisions.title} text={home.decisions.text} invert />
          <MarketplaceDecisionGrid items={home.decisions.items} />
        </div>
      </section>

      <section className="section ecommerce-section marketplace-commercialization-section" id="ecommerce">
        <div className="container">
          <SectionHeading eyebrow={home.commercialization.eyebrow} title={home.commercialization.title} text={home.commercialization.text} invert />
          <MarketplaceCommerceFlow stages={home.commercialization.stages} ecosystems={home.commercialization.ecosystems} ecosystemLabel={home.commercialization.ecosystemsLabel} />
        </div>
      </section>

      <AgenticDirectionTeaser copy={copy.agentic} href={localizedRoutes.cie[locale]} />

      <section className="section trade-section homepage-trade-teaser" id="trade">
        <div className="container">
          <div className="split-heading">
            <SectionHeading eyebrow={home.trade.eyebrow} title={home.trade.title} text={home.trade.text} />
            <Link className="button ink-button" href={localizedRoutes.trade[locale]}>{home.trade.cta}<span aria-hidden="true">↗</span></Link>
          </div>
          <TradeExecutionFlow stages={home.trade.stages} />
        </div>
      </section>

      <section className="section portfolio-section" id="businesses">
        <div className="container">
          <div className="company-home-intro">
            <SectionHeading eyebrow={home.company.eyebrow} title={home.company.title} text={home.company.text} />
            <Link className="text-link dark-link" href={localizedRoutes.company[locale]}>{locale === "de" ? "Unternehmen kennenlernen" : locale === "tr" ? "Exwest'i tanıyın" : "Meet Exwest"}<span aria-hidden="true">↗</span></Link>
          </div>
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

      <section className="section contact-section lead-conversion-section" id="contact">
        <div className="container lead-conversion-grid">
          <div className="lead-conversion-copy">
            <SectionHeading eyebrow={leadForm.eyebrow} title={leadForm.title} text={leadForm.text} invert />
            <div className="contact-identity"><span>EXWEST GMBH</span><strong>Düsseldorf</strong><a href="mailto:contact@exwest.de">contact@exwest.de</a></div>
          </div>
          <CommercialLeadForm locale={locale} copy={leadForm} />
        </div>
      </section>

      <SiteFooter locale={locale} copy={copy.footer} />
    </main>
  );
}

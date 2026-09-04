import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AgentAuthorityModel } from "@/components/AgentAuthorityModel";
import { AgenticCommerceFlow } from "@/components/AgenticCommerceFlow";
import { CIEProductExperience } from "@/components/CIEProductExperience";
import { DefinitionBlock } from "@/components/DefinitionBlock";
import { DetailCTA } from "@/components/DetailCTA";
import { ExwestOperatingModel } from "@/components/ExwestOperatingModel";
import { MarketplaceCommerceFlow } from "@/components/MarketplaceCommerceFlow";
import { ProcessRibbon } from "@/components/ProcessRibbon";
import { QuestionAnswers } from "@/components/QuestionAnswers";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TradeExecutionFlow } from "@/components/TradeExecutionFlow";
import { detailContent, resolveDetailPage, type DetailRouteKey } from "@/lib/detail-content";
import { heroContent, isLocale, localizedRoutes, locales, type Locale } from "@/lib/i18n";
import { siteContent } from "@/lib/site-content";

export function generateStaticParams() {
  return locales.flatMap((locale) => (Object.keys(detailContent) as DetailRouteKey[]).map((routeKey) => ({
    locale,
    slug: localizedRoutes[routeKey][locale].split("/").at(-1)!,
  })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const resolved = resolveDetailPage(locale, slug);
  if (!resolved) return {};
  const paths = localizedRoutes[resolved.routeKey];
  const canonical = paths[locale];
  const image = `${canonical}/opengraph-image`;
  return {
    title: resolved.page.meta.title,
    description: resolved.page.meta.description,
    alternates: { canonical, languages: { de: paths.de, en: paths.en, tr: paths.tr, "x-default": paths.de } },
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : locale === "tr" ? "tr_TR" : "en_GB",
      alternateLocale: locale === "de" ? ["en_GB", "tr_TR"] : locale === "tr" ? ["de_DE", "en_GB"] : ["de_DE", "tr_TR"],
      url: canonical,
      siteName: "Exwest",
      title: resolved.page.meta.title,
      description: resolved.page.meta.description,
      images: [{ url: image, width: 1200, height: 630, alt: resolved.page.title }],
    },
    twitter: { card: "summary_large_image", title: resolved.page.meta.title, description: resolved.page.meta.description, images: [image] },
  };
}

export default async function DetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const resolved = resolveDetailPage(locale, slug);
  if (!resolved) notFound();
  const page = resolved.page;
  const routePath = localizedRoutes[resolved.routeKey][locale];
  const schemaItems: Array<Record<string, unknown>> = [
      { "@type": ["Organization", "Corporation"], "@id": "https://exwest.de/#organization", name: "Exwest GmbH", url: "https://exwest.de", email: "contact@exwest.de", address: { "@type": "PostalAddress", streetAddress: "Königsallee 92a", postalCode: "40212", addressLocality: "Düsseldorf", addressCountry: "DE" } },
      { "@type": "WebSite", "@id": "https://exwest.de/#website", url: "https://exwest.de", name: "Exwest", publisher: { "@id": "https://exwest.de/#organization" }, inLanguage: ["de", "en", "tr"] },
      { "@type": page.kind === "company" ? "AboutPage" : "WebPage", "@id": `https://exwest.de${routePath}#webpage`, url: `https://exwest.de${routePath}`, name: page.meta.title, description: page.meta.description, inLanguage: locale, isPartOf: { "@id": "https://exwest.de/#website" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Exwest", item: `https://exwest.de/${locale}` },
        { "@type": "ListItem", position: 2, name: page.title, item: `https://exwest.de${routePath}` },
      ] },
  ];
  if (page.kind !== "company") schemaItems.push({ "@type": "Service", "@id": `https://exwest.de${routePath}#service`, name: page.meta.title.split("|")[0].trim(), description: page.meta.description, provider: { "@id": "https://exwest.de/#organization" }, areaServed: "International" });
  const schemas = {
    "@context": "https://schema.org",
    "@graph": schemaItems,
  };

  return (
    <main id="main-content" className={`site-shell detail-shell detail-${page.kind}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replaceAll("<", "\\u003c") }} />
      <header className="detail-masthead">
        <SiteHeader locale={locale} content={heroContent[locale]} />
        <div className="container detail-hero">
          <Link href={`/${locale}`} className="detail-back">← {page.back}</Link>
          <p className="eyebrow"><span aria-hidden="true" />{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.lead}</p>
          <div className="detail-hero-rule"><span>EXWEST</span><i /><span>INTELLIGENCE → EXECUTION → SCALE</span></div>
        </div>
      </header>

      <DefinitionBlock eyebrow={page.eyebrow} title={page.definitionTitle} text={page.definition} />

      {page.kind === "cie" ? (
        <>
          <section className="section claim-spectrum-section">
            <div className="container">
              <SectionHeading eyebrow="CAPABILITY STATUS" title={page.currentTitle} text={page.currentText} invert />
              <div className="claim-spectrum">{page.claims.map((claim, index) => <article key={claim.title}><span>{String(index + 1).padStart(2, "0")} · {claim.state}</span><h3>{claim.title}</h3><p>{claim.text}</p></article>)}</div>
            </div>
          </section>

          <section className="section product-experience-section">
            <div className="container">
              <SectionHeading eyebrow={page.experience.label} title={page.experience.title} text={page.experience.note} />
              <CIEProductExperience copy={page.experience} />
            </div>
          </section>

          <section className="section agentic-commerce-section">
            <div className="container">
              <SectionHeading eyebrow={page.agenticEyebrow} title={page.agenticTitle} text={page.agenticText} invert />
              <ProcessRibbon stages={page.agenticLifecycle} label={page.agenticTitle} />
              <AgenticCommerceFlow stages={page.agenticFlow} />
            </div>
          </section>

          <section className="section authority-section">
            <div className="container authority-grid">
              <SectionHeading eyebrow="GOVERNED AUTHORITY" title={page.authorityTitle} text={page.authorityText} />
              <AgentAuthorityModel stages={page.authorityStages} currentLabel={page.authorityCurrent} directionLabel={page.authorityDirection} />
            </div>
          </section>

          <section className="section future-applications-section">
            <div className="container">
              <SectionHeading eyebrow="CIE APPLICATIONS" title={page.applicationsTitle} text={page.applicationsText} />
              <div className="future-application-grid">{page.applications.map((application, index) => <article key={application.title}><header><span>{String(index + 1).padStart(2, "0")}</span><b>{application.state}</b></header><h3>{application.title}</h3><p>{application.text}</p><div>{application.flow.map((step) => <span key={step}>{step}</span>)}</div></article>)}</div>
              <aside className="payment-boundary"><span>REGULATORY BOUNDARY</span><div><h3>{page.paymentTitle}</h3><p>{page.paymentText}</p></div></aside>
            </div>
          </section>
        </>
      ) : null}

      {page.kind === "trade" ? (
        <>
          <section className="section trade-detail-section">
            <div className="container">
              <SectionHeading eyebrow="TRADE WORKFLOW" title={page.capabilitiesTitle} text={page.definition} />
              <TradeExecutionFlow stages={page.flow} />
              <div className="trade-context-grid">
                <figure className="trade-context-media">
                  <Image src="/exwest-commercial-operations.jpg" alt={locale === "de" ? "Kommerzielles Team bei der Prüfung von Produktmustern und Lieferinformationen" : locale === "tr" ? "Ürün numunelerini ve tedarik bilgilerini inceleyen ticari ekip" : "Commercial team reviewing product samples and supply information"} fill sizes="(max-width: 820px) 100vw, 50vw" />
                  <div aria-hidden="true"><span>SUPPLIER CONTEXT</span><b>CIE / REVIEW</b></div>
                  <figcaption>{locale === "de" ? "Editoriale Visualisierung · kein dargestellter Kunde oder Exwest-Standort" : locale === "tr" ? "Editoryal görselleştirme · gösterilen kişiler müşteri, mekân Exwest ofisi değildir" : "Editorial visualization · not a depicted customer or Exwest office"}</figcaption>
                </figure>
                <div className="detail-capability-list">{page.capabilities.map((capability, index) => <article key={capability.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{capability.title}</h3><p>{capability.text}</p></div></article>)}</div>
              </div>
            </div>
          </section>
          <section className="section procurement-section">
            <div className="container"><SectionHeading eyebrow="CIE × GLOBAL SOURCING" title={page.procurementTitle} text={page.procurementText} invert /><ProcessRibbon stages={page.procurementFlow} label={page.procurementTitle} /><p className="detail-boundary">{page.boundary}</p></div>
          </section>
        </>
      ) : null}

      {page.kind === "ecommerce" ? (
        <>
          <section className="section commerce-detail-section">
            <div className="container">
              <SectionHeading eyebrow="COMMERCIALIZATION SYSTEM" title={page.capabilitiesTitle} text={page.definition} invert />
              <MarketplaceCommerceFlow stages={page.flow} ecosystems={page.channels} ecosystemLabel={page.boundary} />
              <div className="detail-capability-grid">{page.capabilities.map((capability, index) => <article key={capability.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{capability.title}</h3><p>{capability.text}</p></article>)}</div>
            </div>
          </section>
          <section className="section economics-section">
            <div className="container"><SectionHeading eyebrow="EMERGING OPERATING MODEL" title={page.economicsTitle} text={page.economicsText} /><ProcessRibbon stages={page.economicsFlow} label={page.economicsTitle} /></div>
          </section>
        </>
      ) : null}

      {page.kind === "company" ? (
        <>
          <section className="section company-model-section">
            <div className="container"><SectionHeading eyebrow="THE EXWEST MODEL" title={page.definitionTitle} text={page.definition} invert /><ExwestOperatingModel items={page.model.map((item) => ({ ...item, name: item.title }))} /></div>
          </section>
          <section className="section company-facts-section">
            <div className="container company-facts-grid"><div><p className="section-eyebrow"><span aria-hidden="true" />EXWEST GMBH</p><h2>{page.factsTitle}</h2></div><dl>{page.facts.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl></div>
            <div className="container portfolio-note"><span>PORTFOLIO SEPARATION</span><div><h2>{page.portfolioTitle}</h2><p>{page.portfolioText}</p></div></div>
          </section>
        </>
      ) : null}

      <QuestionAnswers eyebrow={page.questionsEyebrow} title={page.questionsTitle} items={page.questions} />
      <DetailCTA locale={locale} title={page.ctaTitle} text={page.ctaText} label={page.contact} />
      <SiteFooter locale={locale} copy={siteContent[locale].footer} />
    </main>
  );
}

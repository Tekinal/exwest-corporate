"use client";

import { useEffect, useRef, useState } from "react";

type ExperienceCopy = {
  label: string;
  title: string;
  note: string;
  nav: readonly string[];
  signalsLabel: string;
  signals: readonly string[];
  evidenceLabel: string;
  evidence: readonly string[];
  recommendationLabel: string;
  recommendation: string;
  approval: string;
  stages: ReadonlyArray<{ label: string; title: string; text: string }>;
};

export function CIEProductExperience({ copy }: { copy: ExperienceCopy }) {
  const [active, setActive] = useState(0);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 820px)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number((visible.target as HTMLElement).dataset.stage ?? 0));
      },
      { rootMargin: "-32% 0px -48%", threshold: [0, 0.25, 0.6] },
    );
    stageRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cie-experience-layout">
      <div className="cie-product-mobile" role="img" aria-label={copy.note}>
        <header><span>CIE</span><strong>Marketplace</strong><small>{copy.label}</small></header>
        <section className="mobile-product-signals">
          <p>{copy.signalsLabel}</p>
          <div>{copy.signals.slice(0, 4).map((signal, index) => <span key={signal}><i>{String(index + 1).padStart(2, "0")}</i>{signal}</span>)}</div>
        </section>
        <i className="mobile-product-arrow" aria-hidden="true">↓</i>
        <section className="mobile-decision-layer">
          <small>{copy.evidenceLabel}</small>
          <strong>CIE</strong>
          <div>{copy.evidence.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
        </section>
        <i className="mobile-product-arrow" aria-hidden="true">↓</i>
        <section className="mobile-product-result">
          <small>{copy.recommendationLabel}</small>
          <strong>{copy.recommendation}</strong>
          <span>{copy.approval}</span>
        </section>
        <p>{copy.note}</p>
      </div>
      <div className="cie-product-frame cie-product-frame-desktop" role="img" aria-label={copy.note}>
        <div className="product-topbar" aria-hidden="true">
          <span><i />CIE / Commercial Intelligence</span><small>{copy.label}</small>
        </div>
        <div className="product-workspace" aria-hidden="true">
          <nav>{copy.nav.map((item, index) => <span className={index === Math.min(active, copy.nav.length - 1) ? "active" : ""} key={item}><i />{item}</span>)}</nav>
          <div className="product-feed">
            <p>{copy.signalsLabel}</p>
            {copy.signals.map((signal, index) => <div className={index === active % copy.signals.length ? "selected" : ""} key={signal}><i /><span>{signal}</span><b>{String(index + 1).padStart(2, "0")}</b></div>)}
          </div>
          <div className="product-opportunity">
            <header><span>{copy.evidenceLabel}</span><b>{copy.stages[active].label}</b></header>
            <div className="opportunity-orbit"><i /><i /><i /><strong>CIE</strong></div>
            <dl>{copy.evidence.map((item, index) => <div key={item}><dt>{String(index + 1).padStart(2, "0")}</dt><dd>{item}</dd><span className={index <= active % copy.evidence.length ? "on" : ""} /></div>)}</dl>
          </div>
          <aside className="product-recommendation">
            <span>{copy.recommendationLabel}</span>
            <strong>{copy.recommendation}</strong>
            <p>{copy.stages[active].title}</p>
            <button type="button" tabIndex={-1}>{copy.approval}<i>→</i></button>
          </aside>
        </div>
        <p className="product-disclaimer" aria-hidden="true">{copy.note}</p>
      </div>
      <ol className="experience-narrative">
        {copy.stages.map((stage, index) => (
          <li
            className={active === index ? "active" : ""}
            data-stage={index}
            key={stage.label}
            ref={(node) => { stageRefs.current[index] = node; }}
            onMouseEnter={() => setActive(index)}
          >
            <span>{String(index + 1).padStart(2, "0")} · {stage.label}</span>
            <h3>{stage.title}</h3>
            <p>{stage.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

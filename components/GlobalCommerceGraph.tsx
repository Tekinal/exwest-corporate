type GlobalCommerceGraphProps = {
  labels: readonly string[];
  locale: "de" | "en" | "tr";
};

const nodes = [
  { className: "signal-one", tone: "amber" },
  { className: "signal-two", tone: "mint" },
  { className: "signal-three", tone: "stone" },
  { className: "signal-four", tone: "amber" },
  { className: "signal-five", tone: "mint" },
  { className: "signal-six", tone: "stone" },
] as const;

export function GlobalCommerceGraph({ labels, locale }: GlobalCommerceGraphProps) {
  return (
    <div className="commerce-graph" role="img" aria-label={locale === "de" ? "Visualisierung eines globalen Commercial-Intelligence-Netzwerks" : locale === "tr" ? "Küresel ticari istihbarat ağı görselleştirmesi" : "Global commercial intelligence network visualization"}>
      <div className="graph-grid" aria-hidden="true" />
      <svg className="graph-lines" viewBox="0 0 760 650" aria-hidden="true" preserveAspectRatio="none">
        <path className="line muted" d="M96 118 C250 110 250 260 374 318" />
        <path className="line muted delay-one" d="M640 116 C510 150 520 270 390 318" />
        <path className="line strong delay-two" d="M92 494 C230 480 260 360 374 332" />
        <path className="line muted delay-three" d="M662 510 C540 492 520 370 398 334" />
        <path className="line strong" d="M370 325 C470 320 505 240 622 258" />
        <path className="line muted delay-two" d="M374 325 C295 330 260 412 140 406" />
        <circle className="pulse-orbit" cx="382" cy="326" r="118" />
        <circle className="pulse-orbit second" cx="382" cy="326" r="185" />
      </svg>

      <div className="cie-core">
        <span className="core-kicker">EXWEST</span>
        <strong>CIE</strong>
        <small>{locale === "de" ? "Intelligence Core" : "Intelligence Core"}</small>
      </div>

      {nodes.map((node, index) => (
        <div className={`signal-node ${node.className} ${node.tone}`} key={labels[index]}>
          <span className="signal-dot" aria-hidden="true" />
          <span>{labels[index]}</span>
        </div>
      ))}

      <div className="graph-status" aria-hidden="true">
        <span className="status-light" />
        <span>{locale === "de" ? "Signale werden strukturiert" : locale === "tr" ? "Sinyaller yapılandırılıyor" : "Structuring signals"}</span>
        <b>06</b>
      </div>
    </div>
  );
}

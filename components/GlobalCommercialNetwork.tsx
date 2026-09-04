export function GlobalCommercialNetwork({ regions }: { regions: readonly string[] }) {
  const positions = ["region-eu", "region-tr", "region-me", "region-af", "region-asia"];
  return (
    <div className="global-network" role="img" aria-label="Exwest commercial market orientation">
      <div className="network-longitudes" aria-hidden="true"><i /><i /><i /><i /></div>
      <svg viewBox="0 0 900 470" aria-hidden="true" preserveAspectRatio="none">
        <path d="M230 150 C350 70 470 88 520 200" />
        <path d="M400 178 C510 210 610 170 720 126" />
        <path d="M385 184 C330 260 360 340 438 388" />
        <path d="M520 200 C650 250 750 234 824 310" />
      </svg>
      {regions.map((region, index) => <div className={`region-node ${positions[index]}`} key={region}><i /><span>{region}</span></div>)}
      <div className="network-legend"><span><i />Market orientation</span><span><i />Düsseldorf base</span></div>
    </div>
  );
}

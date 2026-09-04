export function MarketplaceCommerceFlow({ stages, ecosystems, ecosystemLabel }: { stages: readonly string[]; ecosystems: readonly string[]; ecosystemLabel: string }) {
  return (
    <div className="marketplace-flow">
      <div className="commerce-stages">
        {stages.map((stage, index) => (
          <div key={stage} className={index === 1 || index === 5 ? "highlight" : ""}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{stage}</strong>
          </div>
        ))}
      </div>
      <div className="ecosystem-row">
        <p>{ecosystemLabel}</p>
        <div>{ecosystems.map((name) => <span key={name}>{name}</span>)}</div>
      </div>
    </div>
  );
}

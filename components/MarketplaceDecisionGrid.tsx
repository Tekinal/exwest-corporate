export function MarketplaceDecisionGrid({ items }: { items: ReadonlyArray<readonly [string, string]> }) {
  return (
    <div className="marketplace-decision-grid">
      {items.map(([label, question], index) => (
        <article key={label}>
          <header><span>{String(index + 1).padStart(2, "0")}</span><b>{label}</b></header>
          <h3>{question}</h3>
          <div aria-hidden="true"><i /><i /><i /></div>
        </article>
      ))}
    </div>
  );
}

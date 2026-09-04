export function TradeExecutionFlow({ stages }: { stages: readonly string[] }) {
  return (
    <div className="trade-flow">
      <div className="trade-signal-lane"><span>CIE SIGNAL INPUT</span><i /><b>PRIORITY ROUTE</b></div>
      <div className="trade-stages">
        {stages.map((stage, index) => (
          <div className={index === 0 || index === stages.length - 1 ? "active" : ""} key={stage}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{stage}</strong>
            {index < stages.length - 1 ? <i aria-hidden="true">→</i> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

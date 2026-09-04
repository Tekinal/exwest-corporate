export function ProcessRibbon({ stages, label }: { stages: readonly string[]; label: string }) {
  return (
    <div className="process-ribbon" role="group" aria-label={label}>
      {stages.map((stage, index) => (
        <div key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong>{index < stages.length - 1 ? <i aria-hidden="true">→</i> : null}</div>
      ))}
    </div>
  );
}

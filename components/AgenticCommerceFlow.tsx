export function AgenticCommerceFlow({ stages }: { stages: readonly string[] }) {
  return (
    <ol className="agentic-commerce-flow">
      {stages.map((stage, index) => (
        <li className={index === 2 || index === 3 ? "governed" : ""} key={stage}>
          <span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong>
          {index < stages.length - 1 ? <i aria-hidden="true">→</i> : null}
        </li>
      ))}
    </ol>
  );
}

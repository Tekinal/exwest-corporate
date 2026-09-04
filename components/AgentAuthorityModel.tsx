export function AgentAuthorityModel({ stages, currentLabel, directionLabel }: {
  stages: readonly string[];
  currentLabel: string;
  directionLabel: string;
}) {
  return (
    <div className="authority-model">
      <div className="authority-legend"><span><i />{currentLabel}</span><span><i />{directionLabel}</span></div>
      <ol>
        {stages.map((stage, index) => (
          <li className={index < 4 ? "current" : "direction"} key={stage}>
            <span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong>
            {index < stages.length - 1 ? <i aria-hidden="true">↓</i> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

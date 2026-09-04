type ModelItem = { name: string; role: string; text: string };

export function ExwestOperatingModel({ items }: { items: readonly ModelItem[] }) {
  return (
    <div className="operating-model">
      <svg viewBox="0 0 900 580" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <path className="model-path" d="M450 92 C240 120 150 245 170 438" />
        <path className="model-path delay" d="M450 92 C660 120 750 245 730 438" />
        <path className="model-path base" d="M190 456 C330 520 570 520 710 456" />
        <circle cx="450" cy="92" r="66" />
        <circle cx="170" cy="438" r="66" />
        <circle cx="730" cy="438" r="66" />
      </svg>
      {items.map((item, index) => (
        <article className={`model-node model-node-${index + 1}`} key={item.name}>
          <span>{String(index + 1).padStart(2, "0")} · {item.role}</span>
          <h3>{item.name}</h3>
          <p>{item.text}</p>
        </article>
      ))}
      <div className="model-center" aria-hidden="true"><span>EXWEST</span><strong>∞</strong><small>CONNECTED COMMERCE</small></div>
    </div>
  );
}

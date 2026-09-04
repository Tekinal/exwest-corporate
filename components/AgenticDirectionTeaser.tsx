import Link from "next/link";

export function AgenticDirectionTeaser({ copy, href }: {
  copy: { eyebrow: string; title: string; text: string; status: string; cta: string; stages: readonly string[] };
  href: string;
}) {
  return (
    <section className="section agentic-teaser-section" aria-labelledby="agentic-teaser-title">
      <div className="container agentic-teaser-grid">
        <div>
          <p className="section-eyebrow"><span aria-hidden="true" />{copy.eyebrow}</p>
          <h2 id="agentic-teaser-title">{copy.title}</h2>
          <p>{copy.text}</p>
          <div className="direction-status"><i aria-hidden="true" />{copy.status}</div>
          <Link className="text-link" href={href}>{copy.cta}<span aria-hidden="true">↗</span></Link>
        </div>
        <ol className="agentic-teaser-flow">
          {copy.stages.map((stage, index) => (
            <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong>{index < copy.stages.length - 1 ? <i aria-hidden="true">→</i> : null}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, text, invert = false }: { eyebrow: string; title: string; text?: string; invert?: boolean }) {
  return (
    <div className={`section-heading ${invert ? "invert" : ""}`}>
      <p className="section-eyebrow"><span aria-hidden="true" />{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p className="section-copy">{text}</p> : null}
    </div>
  );
}

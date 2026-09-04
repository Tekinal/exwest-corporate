export function DefinitionBlock({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="section definition-section">
      <div className="container definition-grid">
        <p className="section-eyebrow"><span aria-hidden="true" />{eyebrow}</p>
        <div><h2>{title}</h2><p>{text}</p></div>
      </div>
    </section>
  );
}

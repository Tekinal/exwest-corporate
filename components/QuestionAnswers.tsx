export function QuestionAnswers({ eyebrow, title, items }: {
  eyebrow: string;
  title: string;
  items: ReadonlyArray<{ q: string; a: string }>;
}) {
  return (
    <section className="section answers-section" aria-labelledby="answers-title">
      <div className="container answers-grid">
        <div>
          <p className="section-eyebrow"><span aria-hidden="true" />{eyebrow}</p>
          <h2 id="answers-title">{title}</h2>
        </div>
        <div className="answer-list">
          {items.map((item, index) => <article key={item.q}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.q}</h3><p>{item.a}</p></div></article>)}
        </div>
      </div>
    </section>
  );
}

export function CommercialSignalCard({ label, value, tone = "mint" }: { label: string; value: string; tone?: "mint" | "amber" | "stone" }) {
  return (
    <div className={`commercial-signal-card ${tone}`}>
      <span className="commercial-signal-light" aria-hidden="true" />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

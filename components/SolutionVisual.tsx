export function SolutionVisual({ type }: { type: string }) {
  if (type === "export") {
    return <div className="solution-visual export-visual" aria-hidden="true"><span className="point a" /><span className="point b" /><span className="point c" /><i className="route one" /><i className="route two" /></div>;
  }
  if (type === "market") {
    return <div className="solution-visual market-visual" aria-hidden="true"><span style={{ height: "35%" }} /><span style={{ height: "58%" }} /><span style={{ height: "46%" }} /><span style={{ height: "78%" }} /><span style={{ height: "64%" }} /><i /></div>;
  }
  if (type === "marketplace") {
    return <div className="solution-visual marketplace-visual" aria-hidden="true"><span>P</span><i /><span>M</span><i /><span>C</span><b>signal</b></div>;
  }
  return <div className="solution-visual enterprise-visual" aria-hidden="true"><span>01</span><span>02</span><span>03</span><i>review</i></div>;
}

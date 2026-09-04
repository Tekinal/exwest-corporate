type FlowCopy = {
  inputsLabel: string;
  inputs: readonly string[];
  engineLabel: string;
  engine: readonly string[];
  outputsLabel: string;
  outputs: readonly string[];
};

export function CIEIntelligenceFlow({ copy }: { copy: FlowCopy }) {
  return (
    <div className="cie-flow">
      <div className="flow-column input-column">
        <p>{copy.inputsLabel}</p>
        <div className="flow-list">
          {copy.inputs.map((item, index) => <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>)}
        </div>
      </div>

      <div className="flow-core" role="group" aria-label="CIE intelligence process">
        <div className="core-rings" aria-hidden="true"><span /><span /><span /></div>
        <p>{copy.engineLabel}</p>
        <strong>CIE</strong>
        <div className="engine-steps">
          {copy.engine.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>

      <div className="flow-column output-column">
        <p>{copy.outputsLabel}</p>
        <div className="flow-list">
          {copy.outputs.map((item, index) => <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>)}
        </div>
      </div>
      <div className="flow-direction input-direction" aria-hidden="true">→</div>
      <div className="flow-direction output-direction" aria-hidden="true">→</div>
    </div>
  );
}

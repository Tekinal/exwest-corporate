type MarketplaceSignalFieldProps = {
  signals: readonly string[];
  fragmented: string;
  resolved: string;
};

export function MarketplaceSignalField({ signals, fragmented, resolved }: MarketplaceSignalFieldProps) {
  return (
    <div className="marketplace-signal-field" role="img" aria-label={`${signals.join(", ")}. ${fragmented}. CIE Marketplace: ${resolved}.`}>
      <div className="marketplace-signal-cloud" aria-hidden="true">
        {signals.map((signal, index) => <span style={{ "--signal-index": index } as CSSProperties} key={signal}><i />{signal}</span>)}
      </div>
      <div className="marketplace-fragment" aria-hidden="true"><span>{fragmented}</span><i>→</i></div>
      <div className="marketplace-resolver" aria-hidden="true"><small>CIE</small><strong>Marketplace</strong><span>{resolved}</span></div>
    </div>
  );
}
import type { CSSProperties } from "react";

const content = `# Exwest GmbH

Exwest GmbH is a marketplace-commercialization and international-commerce company headquartered in Düsseldorf, Germany.

## Primary product

CIE Marketplace is Exwest's Commercial Intelligence system for helping brand owners, manufacturers, e-commerce operators and marketplace teams evaluate product, pricing, competition, demand, inventory, margin, market and channel opportunities. It turns fragmented commercial signals into better marketplace decisions.

Supplier context, landed cost, MOQ and reorder economics can support marketplace profitability where relevant, but supplier discovery, qualification, RFQ, negotiation, sourcing and cross-border execution belong primarily to Exwest International Trade & Global Supply.

AI-assisted workflows prepare evidence and recommendations; people retain decision, communication, negotiation and approval authority. CIE Marketplace does not autonomously execute transactions. Governed agentic action is product direction, not a claim of current autonomous production capability.

## Business pillars

- CIE Marketplace — primary product and marketplace decision layer
- E-Commerce Commercialization — product, channel and growth execution
- International Trade & Global Supply — supplier, procurement and cross-border execution

## Canonical pages

- German: https://exwest.de/de
- English: https://exwest.de/en
- Turkish: https://exwest.de/tr
- CIE: https://exwest.de/de/cie | https://exwest.de/en/cie | https://exwest.de/tr/cie
- International Trade: https://exwest.de/de/internationaler-handel | https://exwest.de/en/international-trade | https://exwest.de/tr/uluslararasi-ticaret
- E-Commerce: https://exwest.de/de/e-commerce | https://exwest.de/en/e-commerce | https://exwest.de/tr/e-ticaret
- Company: https://exwest.de/de/unternehmen | https://exwest.de/en/company | https://exwest.de/tr/sirket

## Related businesses

- Exwest Modular: https://exwestmodular.de
- Exwest Real Estate: https://realestate.exwest.de

This experimental orientation file is not a ranking mechanism. Canonical HTML, structured data, sitemap and robots policies remain authoritative.
`;

export function GET() {
  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

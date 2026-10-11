const content = `# Exwest GmbH and CIE

Exwest GmbH is based at Königsallee 92a, 40212 Düsseldorf, Germany. Public contact: contact@exwest.de.

## CIE
CIE is an AI commercial operator designed to discover opportunities and coordinate customer conversations towards agreed commercial outcomes under human control. AI Commercial Operating System is its product category.
Market research, sales representation and account coordination are responsibilities within one coordinated system.
Four connected capabilities: Commercial Signal Intelligence, Commercial Strategy, Sales Operations, CRM and Human Control.
Lifecycle: Discover -> Qualify -> Engage -> Quote -> Follow Up -> Close -> Learn.
TasGO, Exwest Modular and Canceviz are CIE customers. Their public stories describe RFQ coordination, product enquiries and commercial opportunity discovery. Walkthroughs explain workflows without presenting invented customer transactions.
Communication channels are scoped for each business and follow contact permissions. CRM, REST, webhooks and MCP are planned integration approaches.

## Company and solutions
Exwest combines IT, sales and business-development expertise. Individual team members have up to 25 years of relevant professional experience.
International trade and e-commerce are CIE solution contexts, rather than a description of Exwest as a trading or e-commerce operator.

## Pages
DE: https://www.exwest.de/de | https://www.exwest.de/de/cie
EN: https://www.exwest.de/en | https://www.exwest.de/en/cie
TR: https://www.exwest.de/tr | https://www.exwest.de/tr/cie
Trade: https://www.exwest.de/de/internationaler-handel | https://www.exwest.de/en/international-trade | https://www.exwest.de/tr/uluslararasi-ticaret
E-Commerce: https://www.exwest.de/de/e-commerce | https://www.exwest.de/en/e-commerce | https://www.exwest.de/tr/e-ticaret
Company: https://www.exwest.de/de/unternehmen | https://www.exwest.de/en/company | https://www.exwest.de/tr/sirket

This optional orientation file is not a ranking mechanism or an operational availability guarantee. Visible HTML and approved evidence remain authoritative.
`;
export function GET() { return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } }); }

import { LegalPageShell } from "@/components/LegalPageShell";
import { legalMetadata } from "@/lib/legal-metadata";

export const metadata = legalMetadata({
  locale: "en",
  title: "Privacy | Exwest GmbH",
  description: "Privacy information for the Exwest GmbH corporate website.",
  dePath: "/de/datenschutz",
  enPath: "/en/privacy",
  trPath: "/tr/gizlilik",
});

export default function PrivacyPage() {
  return (
    <LegalPageShell locale="en" eyebrow="Privacy · Updated September 2026" title="Privacy information" lead="English explanatory version. The German privacy notice remains authoritative. Separate Exwest services provide their own privacy information.">
      <section><h2>1. Controller</h2><address>Exwest GmbH<br />Königsallee 92a<br />40212 Düsseldorf<br />Germany</address><p>Email: <a href="mailto:contact@exwest.de">contact@exwest.de</a></p></section>
      <section><h2>2. Hosting and server logs</h2><p>This website is prepared for hosting on Netlify. When it is accessed, technically necessary connection information may be processed, including the IP address, time, requested resource, referrer, browser and operating-system information, and HTTP status. This supports secure, stable delivery and error analysis under Article 6(1)(f) GDPR.</p><p>Before production launch, the hosting agreement, data-processing terms, actual storage locations and retention periods must be verified against the final Netlify configuration.</p></section>
      <section><h2>3. Language preference</h2><p>When you select DE, EN or TR, the website stores the necessary <code>exwest_locale</code> preference in your browser for up to 180 days. This ensures that automatic detection does not override your explicit choice. You can remove it through your browser settings.</p></section>
      <section><h2>4. Contact form and enquiries</h2><p>The contact form can transmit your name, company, business email address, optional telephone number and message, and selected area of interest. Netlify Forms passes the submission to Exwest for review and handling. Required fields are needed to classify and respond to the enquiry.</p><p>The legal basis is Article 6(1)(b) GDPR for pre-contractual or contractual matters and otherwise Article 6(1)(f) GDPR. Data is removed when no longer required, subject to statutory retention obligations.</p><p>Before production launch, the actual form configuration, recipients, processing terms, storage locations, notifications and retention periods require final legal and technical verification.</p></section>
      <section><h2>5. No analytics or marketing trackers</h2><p>This release uses no analytics, advertising or social-media tracking services and loads no externally hosted webfonts. Separate company services are accessed only when you select their links.</p></section>
      <section><h2>6. External services</h2><p>Links to Exwest Modular and Exwest Real Estate lead to technically independent services. Their privacy notices apply once opened. This corporate website does not actively transmit data to them before you select a link.</p></section>
      <section><h2>7. Recipients and international transfers</h2><p>Hosting and communication providers may receive data as processors where required for delivery, security or communication. If data is processed outside the European Economic Area, the safeguards required by Chapter V GDPR must be reviewed and implemented.</p></section>
      <section><h2>8. Your rights</h2><p>Subject to statutory conditions, you may request access, correction, erasure, restriction, portability or object to processing. Consent may be withdrawn prospectively. You may also lodge a complaint with a data-protection authority.</p><p>To exercise your rights, email <a href="mailto:contact@exwest.de">contact@exwest.de</a>.</p></section>
      <section><h2>9. Updates</h2><p>These notices will be updated when the website, services or legal requirements change. A final legal and technical review is required before production cutover.</p></section>
    </LegalPageShell>
  );
}

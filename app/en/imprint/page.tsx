import { LegalPageShell } from "@/components/LegalPageShell";
import { legalMetadata } from "@/lib/legal-metadata";

export const metadata = legalMetadata({
  locale: "en",
  title: "Imprint | Exwest GmbH",
  description: "Provider identification and verified company information for Exwest GmbH.",
  dePath: "/de/impressum",
  enPath: "/en/imprint",
  trPath: "/tr/kunye",
});

export default function ImprintPage() {
  return (
    <LegalPageShell locale="en" eyebrow="Legal · Updated September 2026" title="Imprint" lead="English explanatory version. The German imprint remains authoritative.">
      <section><h2>Provider</h2><address>Exwest GmbH<br />Königsallee 92a<br />40212 Düsseldorf<br />Germany</address></section>
      <section><h2>Representation</h2><p>Managing Director:<br /><strong>Tekin Aldemir</strong></p></section>
      <section><h2>Contact</h2><p>Email: <a href="mailto:contact@exwest.de">contact@exwest.de</a></p></section>
      <section><h2>Commercial register</h2><p>Register court: Amtsgericht Düsseldorf<br />Registration number: HRB 104648</p></section>
      <section><h2>VAT identification</h2><p>VAT identification number under § 27a German VAT Act:<br />DE370220220</p></section>
      <section><h2>Editorial responsibility</h2><p>Responsible under § 18(2) German Interstate Media Treaty:<br />Tekin Aldemir, address as above.</p></section>
      <section><h2>Notice</h2><p>External links lead to independent services. Their respective providers are responsible for their content.</p></section>
    </LegalPageShell>
  );
}

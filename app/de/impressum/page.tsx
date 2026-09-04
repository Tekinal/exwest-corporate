import { LegalPageShell } from "@/components/LegalPageShell";
import { legalMetadata } from "@/lib/legal-metadata";

export const metadata = legalMetadata({
  locale: "de",
  title: "Impressum | Exwest GmbH",
  description: "Anbieterkennzeichnung und rechtliche Unternehmensangaben der Exwest GmbH.",
  dePath: "/de/impressum",
  enPath: "/en/imprint",
  trPath: "/tr/kunye",
});

export default function ImprintPage() {
  return (
    <LegalPageShell locale="de" eyebrow="Rechtliches · Stand September 2026" title="Impressum" lead="Anbieterkennzeichnung gemäß § 5 Digitale-Dienste-Gesetz (DDG).">
      <section><h2>Anbieter</h2><address>Exwest GmbH<br />Königsallee 92a<br />40212 Düsseldorf<br />Deutschland</address></section>
      <section><h2>Vertretung</h2><p>Vertreten durch den Geschäftsführer:<br /><strong>Tekin Aldemir</strong></p></section>
      <section><h2>Kontakt</h2><p>E-Mail: <a href="mailto:contact@exwest.de">contact@exwest.de</a></p></section>
      <section><h2>Registerangaben</h2><p>Registergericht: Amtsgericht Düsseldorf<br />Handelsregister: HRB 104648</p></section>
      <section><h2>Umsatzsteuer</h2><p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />DE370220220</p></section>
      <section><h2>Redaktionell verantwortlich</h2><p>Verantwortlich im Sinne von § 18 Abs. 2 MStV:<br />Tekin Aldemir, Anschrift wie oben.</p></section>
      <section><h2>Hinweis</h2><p>Externe Links führen zu eigenständigen Angeboten. Für deren Inhalte sind die jeweiligen Anbieter verantwortlich.</p></section>
    </LegalPageShell>
  );
}

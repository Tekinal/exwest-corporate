import { LegalPageShell } from "@/components/LegalPageShell";
import { legalMetadata } from "@/lib/legal-metadata";

export const metadata = legalMetadata({
  locale: "de",
  title: "Datenschutz | Exwest GmbH",
  description: "Datenschutzhinweise für die Corporate-Website der Exwest GmbH.",
  dePath: "/de/datenschutz",
  enPath: "/en/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPageShell locale="de" eyebrow="Datenschutz · Stand September 2026" title="Datenschutzhinweise" lead="Diese Hinweise beschreiben die Datenverarbeitung auf der Corporate-Website exwest.de. Separate Exwest-Angebote stellen eigene Datenschutzhinweise bereit.">
      <section><h2>1. Verantwortlicher</h2><address>Exwest GmbH<br />Königsallee 92a<br />40212 Düsseldorf<br />Deutschland</address><p>E-Mail: <a href="mailto:contact@exwest.de">contact@exwest.de</a></p></section>
      <section><h2>2. Hosting und Server-Protokolle</h2><p>Die Website ist für das Hosting über Netlify vorbereitet. Beim Aufruf können technisch erforderliche Verbindungsdaten verarbeitet werden, insbesondere IP-Adresse, Datum und Uhrzeit, aufgerufene Ressource, Referrer, Browser- und Betriebssysteminformationen sowie HTTP-Status. Die Verarbeitung dient der sicheren, stabilen Bereitstellung und Fehleranalyse auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt im sicheren Betrieb dieser Website.</p><p>Vor dem Produktionsstart sind Hosting-Vertrag, Auftragsverarbeitung, tatsächliche Speicherorte und Löschfristen anhand der finalen Netlify-Konfiguration zu verifizieren.</p></section>
      <section><h2>3. Spracheinstellung</h2><p>Wenn Sie DE oder EN auswählen, speichert die Website die notwendige Einstellung <code>exwest_locale</code> für bis zu 180 Tage in Ihrem Browser. Sie verhindert, dass eine ausdrückliche Sprachwahl durch automatische Erkennung überschrieben wird. Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG; die damit verbundene Verarbeitung erfolgt nach Art. 6 Abs. 1 lit. f DSGVO. Sie können den Eintrag in den Browser-Einstellungen löschen.</p></section>
      <section><h2>4. Kontaktaufnahme</h2><p>Die Website verwendet kein Kontaktformular und speichert keine Formulareingaben. Der Link „Gespräch starten“ öffnet Ihr lokales E-Mail-Programm. Wenn Sie uns schreiben, verarbeiten wir die übermittelten Daten zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen oder vertraglichen Anliegen, ansonsten Art. 6 Abs. 1 lit. f DSGVO. Daten werden gelöscht, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p></section>
      <section><h2>5. Keine Analyse- oder Marketing-Tracker</h2><p>Diese Version setzt keine Analyse-, Werbe- oder Social-Media-Tracking-Dienste ein. Sie lädt keine extern gehosteten Webfonts. Externe Unternehmensangebote werden erst geöffnet, wenn Sie einen entsprechenden Link auswählen.</p></section>
      <section><h2>6. Externe Angebote</h2><p>Links zu Exwest Modular und Exwest Real Estate führen zu technisch eigenständigen Angeboten. Ab dem Aufruf gelten die Datenschutzhinweise des jeweiligen Anbieters. Die Corporate-Website übermittelt nicht aktiv Daten an diese Anbieter, bevor Sie einen Link öffnen.</p></section>
      <section><h2>7. Empfänger und Drittlandübermittlungen</h2><p>Hosting- und Kommunikationsdienstleister können Daten als Auftragsverarbeiter erhalten, soweit dies für Bereitstellung, Sicherheit oder Kommunikation erforderlich ist. Sofern Daten außerhalb des Europäischen Wirtschaftsraums verarbeitet werden, sind die jeweils erforderlichen Garantien nach Kapitel V DSGVO zu prüfen und umzusetzen.</p></section>
      <section><h2>8. Ihre Rechte</h2><p>Unter den gesetzlichen Voraussetzungen haben Sie Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung können Sie mit Wirkung für die Zukunft widerrufen. Außerdem können Sie sich bei einer Datenschutzaufsichtsbehörde beschweren.</p><p>Zur Ausübung Ihrer Rechte schreiben Sie an <a href="mailto:contact@exwest.de">contact@exwest.de</a>.</p></section>
      <section><h2>9. Aktualisierung</h2><p>Diese Hinweise werden angepasst, wenn sich Website, eingesetzte Dienste oder rechtliche Anforderungen ändern. Vor dem Produktions-Cutover ist eine abschließende rechtliche und technische Prüfung erforderlich.</p></section>
    </LegalPageShell>
  );
}

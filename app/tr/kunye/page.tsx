import { LegalPageShell } from "@/components/LegalPageShell";
import { legalMetadata } from "@/lib/legal-metadata";

export const metadata = legalMetadata({
  locale: "tr",
  title: "Künye | Exwest GmbH",
  description: "Exwest GmbH şirket ve yasal sağlayıcı bilgileri.",
  dePath: "/de/impressum",
  enPath: "/en/imprint",
  trPath: "/tr/kunye",
});

export default function ImprintPage() {
  return (
    <LegalPageShell locale="tr" eyebrow="Yasal · Eylül 2026" title="Künye" lead="Açıklayıcı Türkçe sürümdür. Alman hukukuna göre hazırlanan Almanca Impressum metni esastır.">
      <section><h2>Hizmet sağlayıcı</h2><address>Exwest GmbH<br />Königsallee 92a<br />40212 Düsseldorf<br />Almanya</address></section>
      <section><h2>Temsil</h2><p>Şirketi temsile yetkili genel müdür:<br /><strong>Tekin Aldemir</strong></p></section>
      <section><h2>İletişim</h2><p>E-posta: <a href="mailto:contact@exwest.de">contact@exwest.de</a></p></section>
      <section><h2>Ticaret sicili</h2><p>Sicil mahkemesi: Amtsgericht Düsseldorf<br />Sicil numarası: HRB 104648</p></section>
      <section><h2>KDV kimlik numarası</h2><p>Alman Katma Değer Vergisi Kanunu § 27a uyarınca:<br />DE370220220</p></section>
      <section><h2>Editoryal sorumluluk</h2><p>Alman Medya Eyaletlerarası Anlaşması § 18(2) uyarınca sorumlu:<br />Tekin Aldemir, yukarıdaki adres.</p></section>
      <section><h2>Bilgilendirme</h2><p>Harici bağlantılar bağımsız hizmetlere yönlendirir. İlgili hizmet sağlayıcılar kendi içeriklerinden sorumludur.</p></section>
    </LegalPageShell>
  );
}

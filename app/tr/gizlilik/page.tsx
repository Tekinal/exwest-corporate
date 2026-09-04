import { LegalPageShell } from "@/components/LegalPageShell";
import { legalMetadata } from "@/lib/legal-metadata";

export const metadata = legalMetadata({
  locale: "tr",
  title: "Gizlilik | Exwest GmbH",
  description: "Exwest GmbH kurumsal web sitesi için gizlilik bilgileri.",
  dePath: "/de/datenschutz",
  enPath: "/en/privacy",
  trPath: "/tr/gizlilik",
});

export default function PrivacyPage() {
  return (
    <LegalPageShell locale="tr" eyebrow="Gizlilik · Eylül 2026" title="Gizlilik bilgileri" lead="Açıklayıcı Türkçe sürümdür. Almanca gizlilik metni esastır. Ayrı Exwest hizmetleri kendi gizlilik açıklamalarını sunar.">
      <section><h2>1. Veri sorumlusu</h2><address>Exwest GmbH<br />Königsallee 92a<br />40212 Düsseldorf<br />Almanya</address><p>E-posta: <a href="mailto:contact@exwest.de">contact@exwest.de</a></p></section>
      <section><h2>2. Barındırma ve sunucu kayıtları</h2><p>Web sitesi Netlify üzerinde barındırılmak üzere hazırlanmıştır. Siteye erişimde IP adresi, tarih ve saat, istenen kaynak, yönlendiren sayfa, tarayıcı, işletim sistemi ve HTTP durumu gibi teknik bağlantı bilgileri; güvenli ve kararlı sunum ile hata analizi amacıyla işlenebilir.</p><p>Üretim yayını öncesinde barındırma sözleşmesi, veri işleme şartları, gerçek veri konumları ve saklama süreleri nihai Netlify yapılandırmasına göre doğrulanmalıdır.</p></section>
      <section><h2>3. Dil tercihi</h2><p>DE, EN veya TR seçtiğinizde web sitesi gerekli <code>exwest_locale</code> tercihini tarayıcınızda 180 güne kadar saklar. Bu tercih, otomatik algılamanın açık seçiminizi geçersiz kılmasını önler. Kaydı tarayıcı ayarlarından silebilirsiniz.</p></section>
      <section><h2>4. İletişim</h2><p>Web sitesinde iletişim formu bulunmaz ve form verisi saklanmaz. “Görüşme Başlatın” bağlantısı yerel e-posta uygulamanızı açar. Bize yazmanız halinde ilettiğiniz bilgiler talebinizi yanıtlamak ve sözleşme öncesi ya da sözleşmesel süreci yürütmek için işlenir; yasal saklama yükümlülükleri saklıdır.</p></section>
      <section><h2>5. Analitik ve pazarlama takibi yoktur</h2><p>Bu sürüm analitik, reklam veya sosyal medya takip hizmeti kullanmaz ve harici web yazı tipi yüklemez. Bağımsız şirket hizmetleri yalnızca ilgili bağlantıyı seçtiğinizde açılır.</p></section>
      <section><h2>6. Harici hizmetler</h2><p>Exwest Modular ve Exwest Real Estate bağlantıları teknik olarak bağımsız hizmetlere yönlendirir. Açıldıkları andan itibaren ilgili hizmetin gizlilik açıklaması geçerlidir.</p></section>
      <section><h2>7. Alıcılar ve uluslararası aktarımlar</h2><p>Barındırma ve iletişim sağlayıcıları; sunum, güvenlik veya iletişim için gerektiği ölçüde veri işleyen sıfatıyla bilgi alabilir. Avrupa Ekonomik Alanı dışında işleme söz konusuysa GDPR Bölüm V kapsamındaki uygun güvenceler değerlendirilir ve uygulanır.</p></section>
      <section><h2>8. Haklarınız</h2><p>Yasal koşullar altında erişim, düzeltme, silme, işlemeyi kısıtlama, veri taşınabilirliği ve işleme itiraz haklarına sahipsiniz. Ayrıca yetkili veri koruma kurumuna şikâyette bulunabilirsiniz.</p><p>Haklarınızı kullanmak için <a href="mailto:contact@exwest.de">contact@exwest.de</a> adresine yazabilirsiniz.</p></section>
      <section><h2>9. Güncellemeler</h2><p>Web sitesi, kullanılan hizmetler veya yasal gereklilikler değiştiğinde bu açıklama güncellenir. Üretim geçişinden önce nihai hukuki ve teknik inceleme gereklidir.</p></section>
    </LegalPageShell>
  );
}

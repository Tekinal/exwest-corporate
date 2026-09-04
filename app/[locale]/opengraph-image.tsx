import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { heroContent, isLocale } from "@/lib/i18n";

export const alt = "Exwest CIE Marketplace — marketplace opportunity and profitable growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = heroContent[locale];
  const principle = locale === "de" ? "PRODUKT → ENTSCHEIDUNG → WACHSTUM" : locale === "tr" ? "ÜRÜN → KARAR → BÜYÜME" : "PRODUCT → DECISION → GROWTH";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#07100d", color: "#f4f0e7", padding: "62px 68px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ width: "62%", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 18, letterSpacing: 7 }}><span style={{ width: 13, height: 13, display: "flex", border: "2px solid #b8f1cf", transform: "rotate(45deg)" }} />EXWEST</div>
        <div style={{ marginTop: 92, display: "flex", color: "#819089", fontSize: 15, letterSpacing: 4 }}>{copy.eyebrow.toUpperCase()}</div>
        <div style={{ marginTop: 23, display: "flex", flexDirection: "column", fontSize: 62, lineHeight: .98, letterSpacing: -3 }}><span>{copy.titleTop}</span><span style={{ color: "#b8f1cf" }}>{copy.titleBottom}</span></div>
        <div style={{ marginTop: "auto", display: "flex", color: "#7b8982", fontSize: 14, letterSpacing: 3 }}>{principle}</div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ width: 360, height: 360, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(184,241,207,.24)", borderRadius: "50%" }}>
          <div style={{ width: 270, height: 270, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed rgba(255,255,255,.14)", borderRadius: "50%" }}>
            <div style={{ width: 160, height: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid rgba(241,188,118,.35)", borderRadius: "50%", background: "#11231b", color: "#b8f1cf", fontSize: 34, letterSpacing: -1 }}><span>CIE</span><span style={{ marginTop: 4, fontSize: 11, letterSpacing: 2 }}>MARKETPLACE</span></div>
          </div>
        </div>
        <span style={{ position: "absolute", left: -12, top: 157, width: 8, height: 8, display: "flex", borderRadius: "50%", background: "#f1bc76" }} />
        <span style={{ position: "absolute", right: 8, bottom: 140, width: 8, height: 8, display: "flex", borderRadius: "50%", background: "#7ee2a8" }} />
      </div>
    </div>,
    size,
  );
}

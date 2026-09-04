import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { resolveDetailPage } from "@/lib/detail-content";
import { isLocale } from "@/lib/i18n";

export const alt = "Exwest CIE Marketplace and international commerce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const resolved = resolveDetailPage(locale, slug);
  if (!resolved) notFound();
  const page = resolved.page;
  const lane = page.kind === "cie" ? "MARKETPLACE" : page.kind === "trade" ? "EXECUTION" : page.kind === "ecommerce" ? "GROWTH" : "EXWEST";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#07100d", color: "#f4f0e7", padding: "64px 70px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", opacity: .22, backgroundImage: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)", backgroundSize: "70px 70px" }} />
      <div style={{ width: "62%", display: "flex", flexDirection: "column", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 18, letterSpacing: 7 }}><span style={{ width: 13, height: 13, display: "flex", border: "2px solid #b8f1cf", transform: "rotate(45deg)" }} />EXWEST</div>
        <div style={{ marginTop: 75, display: "flex", color: "#7ee2a8", fontSize: 16, letterSpacing: 4 }}>{page.eyebrow.toUpperCase()}</div>
        <div style={{ marginTop: 22, display: "flex", fontSize: 55, lineHeight: 1.02, letterSpacing: -3 }}>{page.title}</div>
        <div style={{ marginTop: "auto", display: "flex", color: "#7b8982", fontSize: 15, letterSpacing: 4 }}>INTELLIGENCE → EXECUTION → SCALE</div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ width: 330, height: 330, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(184,241,207,.28)", borderRadius: "50%" }}>
          <div style={{ width: 235, height: 235, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed rgba(241,188,118,.28)", borderRadius: "50%" }}>
            <div style={{ width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,.18)", borderRadius: "50%", background: "#12231c", color: "#b8f1cf", fontSize: 20, letterSpacing: 2 }}>{lane}</div>
          </div>
        </div>
        <div style={{ position: "absolute", right: -20, top: 175, width: 110, height: 1, display: "flex", background: "#f1bc76" }} />
        <div style={{ position: "absolute", left: 4, bottom: 94, display: "flex", color: "#738078", fontSize: 12, letterSpacing: 3 }}>COMMERCIAL SIGNAL</div>
      </div>
    </div>,
    size,
  );
}

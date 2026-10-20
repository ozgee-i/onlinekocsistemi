import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — Eğitim koçları için yönetim platformu`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(135deg, #ffffff 0%, #eef0ff 55%, #fff4dc 100%)",
        color: "#18181b",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", fontSize: 40 }}>
        <span style={{ fontWeight: 700 }}>Sınav</span>
        <span style={{ fontWeight: 700, color: "#4338ca" }}>Koc</span>
        <span style={{ color: "#71717a", marginLeft: 4 }}>Studio</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 950 }}>
          Öğrencilerinizin gelişimi, tek panelde.
        </div>
        <div style={{ fontSize: 30, color: "#52525b", maxWidth: 950 }}>
          Deneme ve net takibi · Ödev ve konu çizelgesi · Veli portalı · Randevu
        </div>
      </div>
    </div>,
    size,
  );
}

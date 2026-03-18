import { ImageResponse } from "next/og";
import { SITE_CONFIG, getSiteUrl } from "@/lib/seo/site";

export const runtime = "nodejs";
export const alt = "Blog preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function BlogOpenGraphImage() {
  const host = new URL(getSiteUrl()).host;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#ffffff",
        color: "#111827",
        padding: "36px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          border: "1px solid #e5e7eb",
          borderRadius: 20,
          padding: "42px 46px",
          background: "linear-gradient(160deg, #ffffff 0%, #fcfcfd 100%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 24, color: "#6b7280", fontWeight: 600 }}>
            {SITE_CONFIG.siteName}
          </span>
          <span style={{ fontSize: 22, color: "#9ca3af" }}>Blog</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1000 }}>
          <div style={{ fontSize: 86, lineHeight: 0.98, letterSpacing: -1.4, fontWeight: 900 }}>
            Philosophy
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.3, color: "#4b5563" }}>
            Thoughts, project notes, and practical discoveries in software engineering.
          </div>
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#6b7280",
            display: "flex",
            borderTop: "1px solid #e5e7eb",
            paddingTop: 18,
          }}
        >
          {host}/blog
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}

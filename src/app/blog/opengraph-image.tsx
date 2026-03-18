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
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0a0f1f",
          color: "#f8fafc",
          padding: "56px 72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(85% 100% at 10% 12%, rgba(245, 158, 11, 0.28), rgba(10, 15, 31, 0) 62%), radial-gradient(90% 110% at 100% 100%, rgba(34, 211, 238, 0.20), rgba(10, 15, 31, 0) 65%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 700, color: "#fbbf24" }}>{SITE_CONFIG.siteName}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 1000 }}>
            <div style={{ fontSize: 84, lineHeight: 0.98, fontWeight: 900 }}>Philosophy</div>
            <div style={{ fontSize: 34, lineHeight: 1.24, color: "#e2e8f0" }}>
              Thoughts, project notes, and practical discoveries in software engineering.
            </div>
          </div>

          <div style={{ fontSize: 25, color: "#cbd5e1", display: "flex" }}>
            {host}/blog
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

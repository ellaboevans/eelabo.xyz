import { ImageResponse } from "next/og";
import { SITE_CONFIG, getSiteUrl } from "@/lib/seo/site";

export const runtime = "nodejs";
export const alt = `${SITE_CONFIG.siteName} preview`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  const host = new URL(getSiteUrl()).host;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
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
          height: "100%",
          border: "1px solid #e5e7eb",
          borderRadius: 20,
          padding: "42px 46px",
          background: "linear-gradient(160deg, #ffffff 0%, #fcfcfd 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#d97706",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#6b7280",
                letterSpacing: 0.3,
              }}
            >
              {SITE_CONFIG.authorName}
            </span>
          </div>
          <span style={{ fontSize: 22, color: "#9ca3af" }}>Portfolio</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1000 }}>
          <div
            style={{
              fontSize: 52,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: -1.2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            Software Engineer
            <br />
            Building Thoughtful Products
          </div>
          <div style={{ fontSize: 30, color: "#4b5563", lineHeight: 1.32 }}>
            Writing code is always the last thing I do. We think through problems, design solutions,
            and build consensus before writing a single line of code.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#6b7280",
            borderTop: "1px solid #e5e7eb",
            paddingTop: 18,
          }}
        >
          <span>{host}</span>
          <span style={{ color: "#111827", fontWeight: 600 }}>{SITE_CONFIG.siteName}</span>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}

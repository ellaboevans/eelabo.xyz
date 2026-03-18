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
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          background: "#080d20",
          color: "#f8fafc",
          padding: "56px 72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(120% 120% at 85% 15%, rgba(245, 158, 11, 0.28) 0%, rgba(8, 13, 32, 0) 55%), radial-gradient(95% 95% at 0% 100%, rgba(59, 130, 246, 0.24) 0%, rgba(8, 13, 32, 0) 65%)",
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
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 999,
                background: "#f59e0b",
              }}
            />
            <div
              style={{
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: 0.5,
                color: "#fbbf24",
              }}
            >
              {SITE_CONFIG.authorName}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1040 }}>
            <div style={{ fontSize: 58, lineHeight: 1.02, fontWeight: 800, display: "flex", flexDirection: "column" }}>
              Software Engineer
              <br />
              Building Thoughtful Web Products
            </div>
            <div style={{ fontSize: 34, color: "#dbeafe", lineHeight: 1.28 }}>
              Frontend architecture, backend systems, open source, and developer tools.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 25,
              color: "#cbd5e1",
            }}
          >
            <span>{host}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

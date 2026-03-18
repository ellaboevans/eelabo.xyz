import { ImageResponse } from "next/og";
import { getContentMetadata } from "@/lib/utils/content-metadata";
import { SITE_CONFIG, getSiteUrl } from "@/lib/seo/site";

export const runtime = "nodejs";
export const alt = "Blog post preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type OpenGraphImageProps = {
  params: Promise<{ slug: string }>;
};

function truncate(value: string, max: number): string {
  if (value.length <= max) {
    return value;
  }

  return `${value.slice(0, max - 1).trimEnd()}...`;
}

export default async function BlogPostOpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params;

  let title: string = "Blog Post";
  let description: string = SITE_CONFIG.defaultDescription;

  try {
    const post = await getContentMetadata(slug);
    if (post.published) {
      title = post.title;
      description = post.description;
    }
  } catch {
    // Keep fallback values when metadata is unavailable.
  }

  const headline = truncate(title, 78);
  const summary = truncate(description, 170);
  const host = new URL(getSiteUrl()).host;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#ffffff",
        color: "#ffffff",
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
          background:
            "radial-gradient(circle, #051937 0%, #004d7a 35%, #008793 68%, #00bf72 85%, #a8eb12 100%);",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: 12,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  background: "#e5e7eb",
                  display: "flex",
                }}
              />
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: "#e5e7eb",
                  letterSpacing: 0.3,
                }}
              >
                Article
              </span>
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 52,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: -1.2,
              display: "flex",
              flexDirection: "column",
              maxWidth: 1060,
              marginBottom: 14,
            }}
          >
            {headline}
          </div>

          <div style={{ fontSize: 30, color: "#e5e7eb", lineHeight: 1.32, maxWidth: 1020 }}>
            {summary}
          </div>
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e5e7eb",
            paddingTop: 18,
          }}
        >
          <span>
            {host}/blog/{slug}
          </span>
          <span style={{ color: "#e5e7eb", fontWeight: 800, fontSize: 14, letterSpacing: 0.3 }}>
            MADE • IN • GHANA • SOFTWARE • ENGINEER
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}

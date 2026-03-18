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
          <span style={{ fontSize: 24, fontWeight: 600, color: "#6b7280" }}>Article</span>
          <span style={{ fontSize: 22, color: "#9ca3af" }}>{host}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.06,
              letterSpacing: -1,
              fontWeight: 850,
              maxWidth: 1060,
            }}
          >
            {truncate(title, 90)}
          </div>

          <div style={{ fontSize: 29, lineHeight: 1.3, color: "#4b5563", maxWidth: 1020 }}>
            {truncate(description, 165)}
          </div>
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#6b7280",
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
          <span style={{ color: "#111827", fontWeight: 600 }}>{SITE_CONFIG.authorName}</span>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}

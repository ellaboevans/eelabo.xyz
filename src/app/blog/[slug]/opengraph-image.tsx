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
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#090f23",
          color: "#f8fafc",
          padding: "54px 70px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(85% 90% at 18% 0%, rgba(59, 130, 246, 0.32), rgba(9, 15, 35, 0) 62%), radial-gradient(80% 100% at 100% 100%, rgba(245, 158, 11, 0.24), rgba(9, 15, 35, 0) 70%)",
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: "#fbbf24" }}>From the blog</span>
            <span style={{ fontSize: 24, color: "#cbd5e1" }}>{host}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                fontSize: 72,
                lineHeight: 1.08,
                letterSpacing: -1,
                fontWeight: 850,
                maxWidth: 1060,
              }}
            >
              {truncate(title, 90)}
            </div>

            <div style={{ fontSize: 31, lineHeight: 1.28, color: "#e2e8f0", maxWidth: 1020 }}>
              {truncate(description, 165)}
            </div>
          </div>

          <div style={{ fontSize: 24, color: "#cbd5e1", display: "flex", alignItems: "center" }}>
            {host}/blog/{slug}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

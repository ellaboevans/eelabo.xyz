import { ImageResponse } from "next/og";
import { getContentMetadata } from "@/lib/utils/content-metadata";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function AppleIcon({ params }: Props) {
  const { slug } = await params;

  let coverImage: string | null = null;

  try {
    const metadata = await getContentMetadata(slug);
    coverImage = metadata.coverImage;
  } catch {
    // Fallback to default if post not found
  }

  // If we have a cover image, use it as the apple icon
  if (coverImage) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "32px",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ),
      {
        ...size,
      }
    );
  }

  // Fallback: amber gradient with name
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          borderRadius: "32px",
          color: "white",
          fontSize: 72,
          fontWeight: "bold",
        }}
      >
        E
      </div>
    ),
    {
      ...size,
    }
  );
}

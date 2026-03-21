import { ImageResponse } from "next/og";
import { getContentMetadata } from "@/lib/utils/content-metadata";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Icon({ params }: Props) {
  const { slug } = await params;

  let coverImage: string | null = null;

  try {
    const metadata = await getContentMetadata(slug);
    coverImage = metadata.coverImage;
  } catch {
    // Fallback to default if post not found
  }

  // If we have a cover image, use it as the favicon
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
            borderRadius: "6px",
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

  // Fallback: amber-colored icon with "E" initial
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          borderRadius: "6px",
          color: "white",
          fontSize: 20,
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

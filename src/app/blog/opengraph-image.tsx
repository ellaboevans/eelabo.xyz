import OpenGraphImage from "../opengraph-image";

export const runtime = "nodejs";
export const alt = "Blog preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function BlogOpenGraphImage() {
  return OpenGraphImage();
}

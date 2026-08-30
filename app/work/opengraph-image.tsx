import { createOpenGraphImage, openGraphSize } from "@/lib/createOpenGraphImage";

export const alt = "Selected architecture and design work by Paul Narvas";
export const size = openGraphSize;
export const contentType = "image/png";

export default function Image() {
  return createOpenGraphImage({
    label: "Portfolio",
    title: "Selected Work",
    description: "Architecture, technical design, design management and visualisation.",
    meta: "Selected projects · 2012–2026"
  });
}

import { createOpenGraphImage, openGraphSize } from "@/lib/createOpenGraphImage";

export const alt = "Contact Paul Narvas";
export const size = openGraphSize;
export const contentType = "image/png";

export default function Image() {
  return createOpenGraphImage({
    label: "Contact",
    title: "Let’s work together.",
    description: "For collaborations, technical design support or new opportunities.",
    meta: "paul@narvas.co.uk · Sheffield, UK"
  });
}

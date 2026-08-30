import { createOpenGraphImage, openGraphSize } from "@/lib/createOpenGraphImage";

export const alt = "Paul Narvas profile — Design Manager and Architectural Technologist";
export const size = openGraphSize;
export const contentType = "image/png";

export default function Image() {
  return createOpenGraphImage({
    label: "Profile",
    title: "Design Manager & Architectural Technologist",
    description: "Coordinating people, information and design to turn architectural ideas into buildable outcomes.",
    meta: "MSc · BSc (Hons) · ACIAT"
  });
}

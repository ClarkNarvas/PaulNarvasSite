import { createCvPdf } from "@/lib/createCvPdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pdf = await createCvPdf();
    const body = new ArrayBuffer(pdf.byteLength);
    new Uint8Array(body).set(pdf);

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Paul-Narvas-CV.pdf"',
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    console.error("CV generation failed", error);
    return new Response("The CV could not be generated. Please try again.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
}

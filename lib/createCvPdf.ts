import PDFDocument from "pdfkit";
import { cvProfile } from "@/data/cv";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN_X = 48;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

const colours = {
  ink: "#282e34",
  muted: "#68737c",
  accent: "#3975a3",
  pale: "#e7edf1",
  paper: "#fbfbf8",
  rule: "#cbd3d9"
};

function normalisePdfText(value: string) {
  return value
    .replaceAll("–", "-")
    .replaceAll("—", "-")
    .replaceAll("’", "'")
    .replaceAll("£", "GBP ");
}

type FitTextOptions = {
  font?: "Helvetica" | "Helvetica-Bold";
  maxFontSize?: number;
  minFontSize?: number;
  lineGap?: number;
  colour?: string;
};

export async function createCvPdf(): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      autoFirstPage: false,
      bufferPages: true,
      compress: true,
      info: {
        Title: `${cvProfile.name} - Curriculum Vitae`,
        Author: cvProfile.name,
        Subject: cvProfile.title,
        Keywords: "design manager, architectural technologist, modular construction, technical design",
        Creator: "paulnarvas.com CV generator"
      }
    });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("error", reject);
    doc.on("end", () => resolve(new Uint8Array(Buffer.concat(chunks))));

    const text = (value: string) => normalisePdfText(value);

    function fitText(
      value: string,
      x: number,
      y: number,
      width: number,
      height: number,
      options: FitTextOptions = {}
    ) {
      const font = options.font ?? "Helvetica";
      const maxFontSize = options.maxFontSize ?? 8;
      const minFontSize = options.minFontSize ?? 6.3;
      const lineGap = options.lineGap ?? 1.8;
      let fontSize = maxFontSize;

      doc.font(font);
      while (fontSize > minFontSize) {
        doc.fontSize(fontSize);
        if (doc.heightOfString(text(value), { width, lineGap }) <= height) break;
        fontSize -= 0.2;
      }

      doc
        .font(font)
        .fontSize(Math.max(fontSize, minFontSize))
        .fillColor(options.colour ?? colours.ink)
        .text(text(value), x, y, {
          width,
          height,
          lineGap,
          ellipsis: true
        });
    }

    function sectionTitle(title: string, x: number, y: number, width: number) {
      doc
        .font("Helvetica-Bold")
        .fontSize(8)
        .fillColor(colours.accent)
        .text(title.toUpperCase(), x, y, {
          width,
          height: 12,
          characterSpacing: 1.1
        });
      doc
        .moveTo(x, y + 16)
        .lineTo(x + width, y + 16)
        .lineWidth(0.55)
        .strokeColor(colours.rule)
        .stroke();
    }

    doc.addPage({ size: "A4", margins: { top: 0, right: 0, bottom: 0, left: 0 } });
    doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT).fill(colours.paper);
    doc.rect(0, 0, 7, PAGE_HEIGHT).fill(colours.accent);

    doc
      .font("Helvetica-Bold")
      .fontSize(25)
      .fillColor(colours.ink)
      .text(cvProfile.name.toUpperCase(), MARGIN_X, 45, {
        width: 310,
        height: 31,
        characterSpacing: -0.35
      });
    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor(colours.accent)
      .text(cvProfile.title, MARGIN_X, 80, { width: 315, height: 18 });
    doc
      .font("Helvetica")
      .fontSize(8.2)
      .fillColor(colours.muted)
      .text(cvProfile.credentials, MARGIN_X, 102, {
        width: 310,
        height: 12,
        characterSpacing: 0.4
      });

    const contactX = PAGE_WIDTH - MARGIN_X - 183;
    const contact = [cvProfile.location, cvProfile.phone, cvProfile.email, cvProfile.website];
    contact.forEach((line, index) => {
      doc
        .font(index > 1 ? "Helvetica-Bold" : "Helvetica")
        .fontSize(8.1)
        .fillColor(index > 1 ? colours.accent : colours.muted)
        .text(line, contactX, 47 + index * 16, {
          width: 183,
          height: 13,
          align: "right",
          link:
            index === 2
              ? `mailto:${cvProfile.email}`
              : index === 3
                ? `https://${cvProfile.website}`
                : undefined,
          underline: false
        });
    });

    doc
      .moveTo(MARGIN_X, 126)
      .lineTo(PAGE_WIDTH - MARGIN_X, 126)
      .lineWidth(0.9)
      .strokeColor(colours.ink)
      .stroke();

    const leftX = MARGIN_X;
    const leftWidth = 165;
    const dividerX = leftX + leftWidth + 18;
    const rightX = dividerX + 18;
    const rightWidth = PAGE_WIDTH - MARGIN_X - rightX;

    doc
      .moveTo(dividerX, 144)
      .lineTo(dividerX, 786)
      .lineWidth(0.5)
      .strokeColor(colours.rule)
      .stroke();

    sectionTitle("Profile", leftX, 146, leftWidth);
    fitText(cvProfile.profile, leftX, 171, leftWidth, 111, {
      maxFontSize: 8.1,
      minFontSize: 7.1,
      lineGap: 2
    });

    sectionTitle("Core expertise", leftX, 298, leftWidth);
    const expertise = cvProfile.expertise.map((item) => `- ${item}`).join("\n");
    fitText(expertise, leftX, 323, leftWidth, 139, {
      maxFontSize: 7.8,
      minFontSize: 6.8,
      lineGap: 2.1
    });

    sectionTitle("Education & status", leftX, 478, leftWidth);
    const education = [
      ...cvProfile.education.map(
        (item) => `${item.period}\n${item.qualification}\n${item.institution}`
      ),
      "ACIAT\nChartered Institute of Architectural Technologists"
    ].join("\n\n");
    fitText(education, leftX, 503, leftWidth, 143, {
      maxFontSize: 7.5,
      minFontSize: 6.5,
      lineGap: 1.4
    });

    sectionTitle("Selected work", leftX, 662, leftWidth);
    const selectedWork = cvProfile.selectedWork
      .map((project) => `${project.title} - ${project.cvSummary}`)
      .join("\n\n");
    fitText(selectedWork, leftX, 687, leftWidth, 83, {
      maxFontSize: 7.1,
      minFontSize: 6.3,
      lineGap: 1.4
    });

    fitText(cvProfile.additional.join("  |  "), leftX, 778, leftWidth, 20, {
      font: "Helvetica-Bold",
      maxFontSize: 6.4,
      minFontSize: 5.8,
      lineGap: 1,
      colour: colours.muted
    });

    sectionTitle("Experience", rightX, 146, rightWidth);
    const experienceTop = 174;
    const experienceHeights = [73, 78, 111, 143, 122, 81];
    let experienceY = experienceTop;

    cvProfile.experience.forEach((item, index) => {
      const itemHeight = experienceHeights[index] ?? 80;
      const periodWidth = 58;
      const contentX = rightX + periodWidth + 10;
      const contentWidth = rightWidth - periodWidth - 10;
      const detail = [
        `${item.role} | ${item.organisation}${item.location ? `, ${item.location}` : ""}`,
        item.summary,
        ...(item.highlights ?? []).map((highlight) => `- ${highlight}`)
      ].join("\n");

      fitText(item.period.toUpperCase(), rightX, experienceY + 2, periodWidth, 22, {
        font: "Helvetica-Bold",
        maxFontSize: 7,
        minFontSize: 6.2,
        lineGap: 1,
        colour: colours.muted
      });
      fitText(detail, contentX, experienceY, contentWidth, itemHeight - 12, {
        maxFontSize: index === 3 ? 7.45 : 7.8,
        minFontSize: 6.2,
        lineGap: 1.55
      });

      const ruleY = experienceY + itemHeight - 5;
      doc
        .moveTo(rightX, ruleY)
        .lineTo(rightX + rightWidth, ruleY)
        .lineWidth(0.4)
        .strokeColor(colours.rule)
        .stroke();
      experienceY += itemHeight;
    });

    const range = doc.bufferedPageRange();
    if (range.count !== 1) {
      reject(new Error(`CV generator produced ${range.count} pages; expected exactly one.`));
      return;
    }

    const footerY = PAGE_HEIGHT - 30;
    doc
      .moveTo(MARGIN_X, footerY - 9)
      .lineTo(PAGE_WIDTH - MARGIN_X, footerY - 9)
      .lineWidth(0.5)
      .strokeColor(colours.rule)
      .stroke();
    doc
      .font("Helvetica")
      .fontSize(7.2)
      .fillColor(colours.muted)
      .text("PAULNARVAS.COM  |  CURRICULUM VITAE  |  1 / 1", MARGIN_X, footerY, {
        width: CONTENT_WIDTH,
        height: 10,
        align: "right",
        characterSpacing: 0.4
      });

    doc.end();
  });
}

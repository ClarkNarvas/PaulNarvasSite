import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const openGraphSize = {
  width: 1200,
  height: 630
};

type OpenGraphCard = {
  label: string;
  title: string;
  description?: string;
  meta?: string;
};

const [interRegularFont, interSemiBoldFont, ancizarSerifFont] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/Inter-Regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Inter-SemiBold.ttf")),
  readFile(join(process.cwd(), "assets/fonts/AncizarSerif-Regular.ttf"))
]);

function titleSize(title: string) {
  if (title.length > 48) return 64;
  if (title.length > 34) return 72;
  if (title.length > 22) return 82;
  return 96;
}

export function createOpenGraphImage({ label, title, description, meta }: OpenGraphCard) {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          padding: "54px 64px 50px",
          background: "#b3bcc4",
          color: "#282f35",
          fontFamily: "Ancizar Serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 82,
            right: -168,
            display: "flex",
            width: 490,
            height: 490,
            border: "1px solid rgba(40, 47, 53, .18)",
            borderRadius: "50%"
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 158,
            right: -94,
            display: "flex",
            width: 338,
            height: 338,
            border: "1px solid rgba(40, 47, 53, .13)",
            borderRadius: "50%"
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingBottom: 22,
            borderBottom: "1px solid rgba(40, 47, 53, .24)",
            fontSize: 22,
            fontFamily: "Inter",
            letterSpacing: "-.02em",
            textTransform: "uppercase"
          }}
        >
          <div style={{ display: "flex" }}>
            <span>Paul&nbsp;</span>
            <span style={{ fontWeight: 600 }}>Narvas</span>
          </div>
          <span style={{ fontSize: 16, letterSpacing: ".1em" }}>Architecture · Design · Delivery</span>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            maxWidth: 980,
            paddingTop: 22,
            paddingBottom: 24
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: 18,
              fontSize: 17,
              fontFamily: "Inter",
              letterSpacing: ".14em",
              textTransform: "uppercase"
            }}
          >
            {label}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 980,
              fontSize: titleSize(title),
              fontFamily: "Inter",
              fontWeight: 600,
              letterSpacing: "-.055em",
              lineHeight: .96
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                display: "flex",
                maxWidth: 860,
                marginTop: 24,
                fontSize: 24,
                letterSpacing: "-.02em",
                lineHeight: 1.25
              }}
            >
              {description}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 20,
            borderTop: "1px solid rgba(40, 47, 53, .24)",
            fontSize: 17,
            fontFamily: "Inter",
            letterSpacing: ".05em"
          }}
        >
          <span>{meta ?? "Design Manager · Architectural Technologist"}</span>
          <span>paulnarvas.com</span>
        </div>
      </div>
    ),
    {
      ...openGraphSize,
      fonts: [
        { name: "Inter", data: interRegularFont, style: "normal", weight: 400 },
        { name: "Inter", data: interSemiBoldFont, style: "normal", weight: 600 },
        { name: "Ancizar Serif", data: ancizarSerifFont, style: "normal", weight: 400 }
      ]
    }
  );
}

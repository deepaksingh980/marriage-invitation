import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Deepak ❤️ Chandani | Wedding Invitation — February 10, 2027";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Node.js runtime to allow fs.readFileSync for local image loading
export const runtime = "nodejs";

function toDataURL(filePath: string, mime: string): string {
  const buf = readFileSync(filePath);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

export default async function Image() {
  const groomSrc = toDataURL(
    join(process.cwd(), "public/images/groom.jpeg"),
    "image/jpeg"
  );
  const brideSrc = toDataURL(
    join(process.cwd(), "public/images/bride.jpeg"),
    "image/jpeg"
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #5C0A12 0%, #3C050B 45%, #1F0104 100%)",
          fontFamily: "Georgia, serif",
          overflow: "hidden",
        }}
      >
        {/* Subtle texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 65%)",
          }}
        />

        {/* Outer gold border */}
        <div
          style={{
            position: "absolute",
            inset: "14px",
            border: "2px solid rgba(212,175,55,0.65)",
            borderRadius: "18px",
            display: "flex",
          }}
        />
        {/* Inner gold border */}
        <div
          style={{
            position: "absolute",
            inset: "22px",
            border: "1px solid rgba(212,175,55,0.25)",
            borderRadius: "13px",
            display: "flex",
          }}
        />

        {/* Corner ornaments */}
        {(
          [
            { top: "28px", left: "28px" },
            { top: "28px", right: "28px" },
            { bottom: "28px", left: "28px" },
            { bottom: "28px", right: "28px" },
          ] as React.CSSProperties[]
        ).map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              color: "#D4AF37",
              fontSize: "22px",
              lineHeight: 1,
              display: "flex",
            }}
          >
            ✦
          </div>
        ))}

        {/* Left: Groom photo */}
        <div
          style={{
            position: "absolute",
            left: "52px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "210px",
            height: "270px",
            borderRadius: "50% 50% 50% 50% / 45% 45% 55% 55%",
            border: "3px solid #D4AF37",
            overflow: "hidden",
            boxShadow: "0 0 0 6px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.6)",
            display: "flex",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={groomSrc}
            alt="Groom Deepak Kumar"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
          />
        </div>

        {/* Right: Bride photo */}
        <div
          style={{
            position: "absolute",
            right: "52px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "210px",
            height: "270px",
            borderRadius: "50% 50% 50% 50% / 45% 45% 55% 55%",
            border: "3px solid #D4AF37",
            overflow: "hidden",
            boxShadow: "0 0 0 6px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.6)",
            display: "flex",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brideSrc}
            alt="Bride Chandani Kumari"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
          />
        </div>

        {/* Center content */}
        <div
          style={{
            position: "absolute",
            left: "290px",
            right: "290px",
            top: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0px",
          }}
        >
          {/* Ganesha invocation */}
          <div
            style={{
              color: "#D4AF37",
              fontSize: "15px",
              letterSpacing: "0.18em",
              marginBottom: "10px",
              display: "flex",
            }}
          >
            ॥ श्री गणेशाय नमः ॥
          </div>

          {/* Decorative line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "linear-gradient(to right, transparent, #D4AF37)",
                display: "flex",
              }}
            />
            <div style={{ color: "#D4AF37", fontSize: "12px", display: "flex" }}>✦</div>
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "linear-gradient(to left, transparent, #D4AF37)",
                display: "flex",
              }}
            />
          </div>

          {/* Groom name */}
          <div
            style={{
              color: "#FAF7F2",
              fontSize: "54px",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "0.04em",
              display: "flex",
            }}
          >
            Deepak
          </div>

          {/* Heart */}
          <div
            style={{
              color: "#D4AF37",
              fontSize: "32px",
              margin: "6px 0",
              display: "flex",
            }}
          >
            ❤️
          </div>

          {/* Bride name */}
          <div
            style={{
              color: "#FAF7F2",
              fontSize: "54px",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "0.04em",
              display: "flex",
            }}
          >
            Chandani
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              margin: "14px 0",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "70px",
                background: "linear-gradient(to right, transparent, #D4AF37)",
                display: "flex",
              }}
            />
            <div style={{ color: "#D4AF37", fontSize: "12px", display: "flex" }}>✦</div>
            <div
              style={{
                height: "1px",
                width: "70px",
                background: "linear-gradient(to left, transparent, #D4AF37)",
                display: "flex",
              }}
            />
          </div>

          {/* Wedding invitation label */}
          <div
            style={{
              color: "rgba(212,175,55,0.9)",
              fontSize: "13px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              marginBottom: "16px",
              display: "flex",
            }}
          >
            WEDDING INVITATION
          </div>

          {/* Description */}
          <div
            style={{
              color: "rgba(250,247,242,0.75)",
              fontSize: "13px",
              textAlign: "center",
              lineHeight: 1.6,
              marginBottom: "18px",
              display: "flex",
              maxWidth: "500px",
            }}
          >
            With the blessings of our families, we warmly invite you to celebrate our wedding.
          </div>

          {/* Date & venue pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(212,175,55,0.12)",
              border: "1px solid rgba(212,175,55,0.45)",
              borderRadius: "30px",
              padding: "9px 22px",
            }}
          >
            <div style={{ color: "#D4AF37", fontSize: "13px", letterSpacing: "0.15em", display: "flex" }}>
              📅 FEB 10, 2027
            </div>
            <div style={{ color: "rgba(212,175,55,0.4)", fontSize: "16px", display: "flex" }}>•</div>
            <div style={{ color: "#D4AF37", fontSize: "13px", letterSpacing: "0.15em", display: "flex" }}>
              📍 PALAMU, JHARKHAND
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const alt = "Vedant Chawla — Product Manager & Music Curator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated OG/social card, matching the site's "Golden Hour" palette.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(120% 95% at 50% 30%, #241812 0%, #170f0a 58%, #120b07 100%)",
          color: "#f5ece0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#a2907e",
          }}
        >
          <span>Atlanta, GA</span>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 8,
              background: "#cf5a2c",
              display: "flex",
            }}
          />
          <span>Visible sound</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 144,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            <span>Vedant</span>
            <span style={{ color: "#e0a13c", marginLeft: 28 }}>Chawla</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              marginTop: 30,
              color: "rgba(245,236,224,0.8)",
            }}
          >
            Product Manager &amp; Music Curator
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#a2907e",
          }}
        >
          <span>vedant-chawla.vercel.app</span>
          <span style={{ display: "flex", gap: 10 }}>
            <span style={{ width: 14, height: 14, borderRadius: 14, background: "#e0a13c", display: "flex" }} />
            <span style={{ width: 14, height: 14, borderRadius: 14, background: "#cf5a2c", display: "flex" }} />
            <span style={{ width: 14, height: 14, borderRadius: 14, background: "#7a3f63", display: "flex" }} />
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

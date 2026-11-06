import { ImageResponse } from "next/og";

export const alt = "Vedant Chawla — Product Manager & DJ (V.C. Beats)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated OG/social card, matching the site's warm graphite + brass palette.
export default function OpengraphImage() {
  const specs = [
    ["Alias", "V.C. Beats"],
    ["Craft", "Producer · DJ"],
    ["Day job", "Product Manager"],
    ["Based", "Atlanta"],
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#16140f",
          color: "#eceae4",
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
            color: "#8c857a",
          }}
        >
          <span style={{ width: 40, height: 2, background: "#b4824a", display: "flex" }} />
          <span>Portfolio · Product Manager & DJ</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 150, fontWeight: 800, lineHeight: 1, letterSpacing: -5 }}>
            Vedant Chawla
          </div>
          <div style={{ display: "flex", fontSize: 38, marginTop: 28, color: "rgba(236,234,228,0.78)" }}>
            Product manager by day. V.C. Beats the rest of the time.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
          {specs.map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                borderTop: "1px solid rgba(236,234,228,0.14)",
                paddingTop: 14,
              }}
            >
              <span style={{ fontSize: 20, letterSpacing: 3, textTransform: "uppercase", color: "#8c857a" }}>
                {k}
              </span>
              <span style={{ fontSize: 46, fontWeight: 700, color: "#d0a66e", marginTop: 6 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const alt = "Swastik Sahu — Full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 80, background: "#0c0c0c", color: "#d7e2ea" }}>
        <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#8f9aa5" }}>Full-stack developer · Applied ML</div>
        <div style={{ fontSize: 150, fontWeight: 900, lineHeight: 1, marginTop: 20, textTransform: "uppercase", color: "#bbccd7" }}>Swastik Sahu</div>
        <div style={{ fontSize: 44, marginTop: 24, display: "flex" }}>
          I build software that <span style={{ color: "#d27bff", marginLeft: 14 }}>shows its reasoning.</span>
        </div>
      </div>
    ),
    size,
  );
}

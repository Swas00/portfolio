import { ImageResponse } from "next/og";

export const alt = "Swastik Sahu — Full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 80, background: "#f1ede3", color: "#14130f" }}>
        <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#5d5a50" }}>Swastik Sahu · Full-stack developer</div>
        <div style={{ fontSize: 104, lineHeight: 1, marginTop: 24, display: "flex", flexWrap: "wrap" }}>
          I build software that <span style={{ color: "#c8321d", marginLeft: 24 }}>shows its reasoning.</span>
        </div>
      </div>
    ),
    size,
  );
}

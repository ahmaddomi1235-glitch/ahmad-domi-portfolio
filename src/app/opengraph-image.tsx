import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0B1220",
          color: "#F6F3ED",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 88,
            height: 88,
            borderRadius: 999,
            background: "#F6F3ED",
            color: "#0B1220",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          AD
        </div>
        <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.2, maxWidth: 900 }}>Ahmad Domi</div>
        <div style={{ fontSize: 34, color: "#B99352", marginTop: 16 }}>BTEC IT Instructor · Jordan</div>
        <div style={{ fontSize: 24, color: "#F6F3ED", opacity: 0.7, marginTop: 28 }}>
          Cybersecurity · AI · Data Modelling · IT Project Management
        </div>
        <div style={{ fontSize: 22, color: "#F6F3ED", opacity: 0.55, marginTop: 40 }}>ahmaddomiedu.com</div>
      </div>
    ),
    { ...size },
  );
}

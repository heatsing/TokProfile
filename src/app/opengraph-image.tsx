import { ImageResponse } from "next/og";

export const alt = "TokLens public TikTok viewer and creator analytics";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#FFFCF5",
        color: "#10211B",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundImage: "radial-gradient(rgba(16,33,27,.14) 2px, transparent 2px)",
          backgroundSize: "24px 24px",
          display: "flex",
          height: "100%",
          inset: 0,
          opacity: 0.55,
          position: "absolute",
          width: "100%",
        }}
      />
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          textAlign: "center",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 30,
            fontWeight: 800,
            gap: 14,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: "#10211B",
              borderRadius: 16,
              display: "flex",
              height: 52,
              justifyContent: "center",
              width: 52,
            }}
          >
            <div
              style={{
                border: "6px solid #B9FF66",
                borderRadius: 999,
                display: "flex",
                height: 20,
                width: 20,
              }}
            />
          </div>
          TokLens
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-4px",
            lineHeight: 1.02,
            maxWidth: 980,
          }}
        >
          Public TikTok Viewer
          <span style={{ color: "#173D30", display: "block" }}>
            &amp; Creator Analytics
          </span>
        </div>
        <div
          style={{
            background: "#B9FF66",
            borderRadius: 999,
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            marginTop: 44,
            padding: "15px 28px",
          }}
        >
          One public link. One focused view.
        </div>
      </div>
    </div>,
    size,
  );
}

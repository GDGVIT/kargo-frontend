import { ImageResponse } from "next/og";

export const defaultSize = { width: 1200, height: 630 };
export const defaultContentType = "image/png";

export function getOgImageJSX({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #18181b 60%, #23272f 100%)",
        color: "#fff",
        fontFamily: "Inter, Arial, sans-serif",
        padding: 60,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: "-2px",
          marginBottom: description ? 32 : 0,
          textAlign: "center",
          lineHeight: 1.1,
          textShadow: "0 2px 16px #0008",
        }}
      >
        {title}
      </div>
      {description && (
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: "#b3b3b3",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.3,
            textShadow: "0 1px 8px #0006",
          }}
        >
          {description}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 60,
          fontSize: 28,
          color: "#6366f1",
          fontWeight: 700,
          opacity: 0.9,
          letterSpacing: 2,
        }}
      >
        kargo.run
      </div>
    </div>
  );
}

export default function ogImageHandler({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return new ImageResponse(getOgImageJSX({ title, description }), {
    ...defaultSize,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

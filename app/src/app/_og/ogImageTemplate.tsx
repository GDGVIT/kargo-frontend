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
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #18181b 0%, #23272f 100%)",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        padding: 60,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          marginBottom: 32,
          letterSpacing: -2,
          textShadow: "0 2px 16px #0008",
        }}
      >
        {title}
      </div>
      {description && (
        <div
          style={{
            fontSize: 36,
            fontWeight: 400,
            opacity: 0.85,
            maxWidth: 900,
            textAlign: "center",
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
          fontSize: 32,
          opacity: 0.5,
        }}
      >
        kargo.upayan.dev
      </div>
    </div>
  );
}

export default async function ogImageHandler({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return new ImageResponse(getOgImageJSX({ title, description }), {
    ...defaultSize,
  });
}

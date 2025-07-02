import { ImageResponse } from "next/og";
import { defaultSize } from "../utils/og";

export interface OgImageOptions {
  text: string;
  alt?: string;
  size?: { width: number; height: number };
  contentType?: string;
}

const background = "#000";
const color = "#fff";

export function createOgImage({ text, size = defaultSize }: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          color,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 48,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://kargo.upayan.dev/icon.png"
            alt="Logo"
            style={{
              width: 128,
              height: 128,
            }}
          />
          <span style={{ whiteSpace: "pre-line" }}>{text}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

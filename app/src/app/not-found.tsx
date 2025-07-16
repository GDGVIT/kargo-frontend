import Link from "next/link";
import { generatePageMetadata } from "../lib/metadata";

const title = "Page Not Found";
const description =
  "Sorry, the page you are looking for does not exist or has been moved.";

export const metadata = generatePageMetadata({
  title,
  description,
  path: "/404",
  imageAlt: "Kargo - Page Not Found",
});

export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          margin: "2rem 0 1rem 0",
        }}
      >
        404 - Page Not Found
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "2rem",
          color: "#555",
        }}
      >
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <button
          style={{
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            borderRadius: "0.5rem",
            background: "#3182ce",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Go to Homepage
        </button>
      </Link>
    </main>
  );
}

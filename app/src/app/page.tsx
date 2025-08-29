import Hero from "../components/Hero/Hero";
import { generatePageMetadata } from "../lib/metadata";

const title = "Kargo";
const description =
  "Kargo lets you deploy containerized applications with full flexibility — AI-powered setup, secure infrastructure, and Kubernetes-native scaling, all from a powerful web interface.";

export const metadata = generatePageMetadata({
  title,
  description,
  path: "",
  imageAlt: "Kargo - Deploy containerized applications with AI-powered setup",
});

export default function Home() {
  return (
    <main style={{ justifyContent: "center" }}>
      <Hero />
    </main>
  );
}

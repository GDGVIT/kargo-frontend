import Hero from "../components/Hero/Hero";

const title = "Kargo";
const description =
  "Kargo lets you deploy containerized applications with full flexibility — AI-powered setup, secure infrastructure, and Kubernetes-native scaling, all from a powerful web interface.";

export const metadata = {
  title,
  description,
};

export default function Home() {
  return (
    <main style={{ justifyContent: "center" }}>
      <Hero />
    </main>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

import { AuthProvider } from "../components/Auth/AuthProvider/AuthProvider";
import { NotificationProvider } from "../components/ui/Notification/Notification";
import Header from "../components/ui/Header/Header";
import Footer from "../components/ui/Footer/Footer";
import Sidebar from "../components/ui/Sidebar/Sidebar";
import AcceptCookies from "../components/AcceptCookies/AcceptCookies";
import LayoutWrapper from "../components/ui/LayoutWrapper/LayoutWrapper";
import ServiceWorkerRegister from "../components/ServiceWorkerRegister/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "Kargo",
  description:
    "Kargo lets you deploy containerized applications with full flexibility — AI-powered setup, secure infrastructure, and Kubernetes-native scaling, all from a powerful web interface.",
  metadataBase: new URL("https://kargo.upayan.dev/"),
  openGraph: {
    title: "Kargo",
    description:
      "Kargo lets you deploy containerized applications with full flexibility — AI-powered setup, secure infrastructure, and Kubernetes-native scaling, all from a powerful web interface.",
    url: "https://kargo.upayan.dev/",
    siteName: "Kargo",
    images: [
      {
        url: "/icon.avif",
        width: 512,
        height: 512,
        alt: "Kargo OpenGraph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kargo",
    description:
      "Kargo lets you deploy containerized applications with full flexibility — AI-powered setup, secure infrastructure, and Kubernetes-native scaling, all from a powerful web interface.",
    images: ["/icon.avif"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.webp"
        />
      </head>
      <body>
        <Script src="/env.js" strategy="beforeInteractive" />
        <NotificationProvider>
          <AuthProvider>
            <Sidebar />
            <LayoutWrapper>
              <Header />
              {children}
              <Footer />
              <ServiceWorkerRegister />
            </LayoutWrapper>
            <AcceptCookies />
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../components/Auth/AuthProvider/AuthProvider";
import { NotificationProvider } from "../components/Notification/Notification";

export const metadata: Metadata = {
  title: "Kargo",
  description:
    "Kargo lets you deploy containerized applications with full flexibility — AI-powered setup, secure infrastructure, and Kubernetes-native scaling, all from a powerful web interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NotificationProvider>
          <AuthProvider>{children}</AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../components/Auth/AuthProvider/AuthProvider";
import { NotificationProvider } from "../components/Notification/Notification";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import AcceptCookies from "../components/AcceptCookies/AcceptCookies";

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
          <AuthProvider>
            <Header />
            <Sidebar />
            {children}
            <AcceptCookies />
          </AuthProvider>{" "}
        </NotificationProvider>
      </body>
    </html>
  );
}

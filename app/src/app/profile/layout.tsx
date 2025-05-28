import ProtectRoutes from "../../components/Auth/ProtectedRoutes/ProtectRoutes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectRoutes>{children}</ProtectRoutes>;
}

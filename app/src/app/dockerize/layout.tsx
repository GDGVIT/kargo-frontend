import ProtectedRoutes from "../../components/Auth/ProtectedRoutes/ProtectedRoutes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoutes>{children}</ProtectedRoutes>;
}

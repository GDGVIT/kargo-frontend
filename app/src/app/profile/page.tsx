import ProtectRoutes from "../../components/Auth/ProtectedRoutes/ProtectRoutes";
import Profile from "../../components/Profile/Profile";

export default function ProfilePage() {
  return (
    <main>
      <ProtectRoutes>
        <Profile />
      </ProtectRoutes>
    </main>
  );
}

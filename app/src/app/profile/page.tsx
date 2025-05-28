import ProtectRoutes from "../../components/Auth/ProtectedRoutes/ProtectRoutes";
import Profile from "../../components/Profile/Profile";
import GithubRepos from "../../components/GithubRepos/GithubRepos";

export default function ProfilePage() {
  return (
    <main>
      <ProtectRoutes>
        <Profile />
        <GithubRepos />
      </ProtectRoutes>
    </main>
  );
}

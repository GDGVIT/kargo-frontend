import { FaDocker } from "react-icons/fa";
import GithubRepos from "../../components/Github/GithubRepos/GithubRepos";
import PageHeading from "../../components/ui/PageHeading/PageHeading";

export default function DockerizePage() {
  return (
    <main>
      <PageHeading
        title="Dockerize Your Application"
        subtitle="Easily containerize your app with Docker"
        icon={<FaDocker />}
      />
      <GithubRepos />
    </main>
  );
}

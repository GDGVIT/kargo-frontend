import { FaDocker } from "react-icons/fa";
import GithubRepos from "../../components/Github/GithubRepos/GithubRepos";
import PageHeading from "../../components/ui/PageHeading/PageHeading";

const title = "Dockerize Your Application";
const description = "Easily containerize your app with Docker";

export const metadata = {
  title,
  description,
};

export default function DockerizePage() {
  return (
    <main>
      <PageHeading title={title} subtitle={description} icon={<FaDocker />} />
      <GithubRepos />
    </main>
  );
}

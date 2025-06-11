import Dockerize from "../../components/Dockerize/Dockerize";
import PageHeading from "../../components/ui/PageHeading/PageHeading";

export default function DockerizePage() {
  return (
    <main>
      <PageHeading
        title="Dockerize Your Application"
        subtitle="Easily containerize your app with Docker."
      />
      <Dockerize />
    </main>
  );
}

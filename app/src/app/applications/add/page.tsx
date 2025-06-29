import AddAppForm from "../../../components/Applications/AddAppForm/AddAppForm";
import PageHeading from "../../../components/ui/PageHeading/PageHeading";
import { FiPlusCircle } from "react-icons/fi";

const title = "Add Application";
const description = "Fill in the details to add a new application.";

export const metadata = {
  title,
  description,
};

export default function AddAppPage() {
  return (
    <main>
      <PageHeading
        title={title}
        subtitle={description}
        icon={<FiPlusCircle />}
      />
      <AddAppForm />
    </main>
  );
}

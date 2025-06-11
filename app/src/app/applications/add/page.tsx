import AddAppForm from "../../../components/Applications/AddAppForm/AddAppForm";
import PageHeading from "../../../components/ui/PageHeading/PageHeading";
import { MdAdd } from "react-icons/md";

export default function AddAppPage() {
  return (
    <main>
      <PageHeading
        title="Add Application"
        subtitle="Fill in the details to add a new application."
        icon={<MdAdd />}
      />
      <AddAppForm />
    </main>
  );
}

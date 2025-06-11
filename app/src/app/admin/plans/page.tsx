import AdminPlansDashboard from "../../../components/Admin/AdminPlansDashboard/AdminPlansDashboard";
import PageHeading from "@/components/ui/PageHeading/PageHeading";
import { MdOutlinePayment } from "react-icons/md";

export default function AdminPlansPage() {
  return (
    <main>
      <PageHeading
        title="Admin Plans"
        subtitle="Manage your application plans."
        icon={<MdOutlinePayment />}
      />
      <AdminPlansDashboard />
    </main>
  );
}

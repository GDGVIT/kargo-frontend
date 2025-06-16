import AdminPlansDashboard from "../../../components/Admin/AdminPlansDashboard/AdminPlansDashboard";
import PageHeading from "@/components/ui/PageHeading/PageHeading";
import { MdOutlinePayment } from "react-icons/md";

export default function AdminPlansPage() {
  return (
    <main>
      <PageHeading
        title="Admin Plans"
        subtitle="Manage all subscription plans, view plan details, and control plan features. Use the actions below to create, edit, or delete plans. Changes are applied instantly."
        icon={<MdOutlinePayment />}
      />
      <AdminPlansDashboard />
    </main>
  );
}

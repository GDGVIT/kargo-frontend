"use client";

import { useRouter } from "next/navigation";
import Card from "../ui/Card/Card";
import { AnimatedButton } from "../ui/AnimatedButton/AnimatedButton";
import { FaUsers, FaClipboardList } from "react-icons/fa";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[var(--background)] py-12">
      <Card className="shadow-xl rounded-2xl p-10 w-full max-w-md flex flex-col items-center gap-8 border border-[#23283a]">
        <h1 className="text-3xl font-bold mb-2 text-[var(--foreground)] tracking-tight">
          Admin Dashboard
        </h1>
        <div className="flex flex-col gap-6 w-full">
          <AnimatedButton
            onClick={() => router.push("/admin/users")}
            icon={<FaUsers className="h-5 w-5" />}
          >
            Manage Users
          </AnimatedButton>
          <AnimatedButton
            onClick={() => router.push("/admin/plans")}
            icon={<FaClipboardList className="h-5 w-5" />}
          >
            Manage Plans
          </AnimatedButton>
        </div>
      </Card>
    </div>
  );
}

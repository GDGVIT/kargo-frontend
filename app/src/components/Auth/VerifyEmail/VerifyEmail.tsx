"use client";

import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useNotification } from "../../Notification/Notification";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const [message, setMessage] = useState("");
  const { notify } = useNotification();

  useEffect(() => {
    const searchParams =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : null;
    const token = searchParams?.get("token");
    if (!token) return;

    api
      .get(`/api/auth/verify-email`, { params: { token } })
      .then(() => {
        setStatus("success");
        setMessage("Your email has been verified! You can now log in.");
        notify("Your email has been verified! You can now log in.", "success");
      })
      .catch((err) => {
        setStatus("error");
        const errorMsg = err.response?.data?.message || "Verification failed.";
        setMessage(errorMsg);
        notify(errorMsg, "error");
      });
  }, [notify]);

  return (
    <div className="max-w-md mx-auto p-8 mt-16 bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-800 text-center text-white">
      <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
      {status === "pending" && (
        <p className="text-zinc-300">Verifying your email...</p>
      )}
      {status === "success" && <p className="text-emerald-400">{message}</p>}
      {status === "error" && <p className="text-rose-400">{message}</p>}
    </div>
  );
}

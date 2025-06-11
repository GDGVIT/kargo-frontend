"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "../../../utils/api";
import useNotification from "../../ui/Notification/Notification";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const [message, setMessage] = useState("");
  const { notify } = useNotification();
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Missing verification token.");
      notify("Missing verification token.", "error");
      return;
    }

    const verify = async () => {
      try {
        await api.get(`/api/auth/verify-email`, { params: { token } });
        setStatus("success");
        setMessage("Your email has been verified! You can now log in.");
        notify("Your email has been verified! You can now log in.", "success");
        setTimeout(() => {
          router.replace("/auth");
        }, 1500);
      } catch (err) {
        let errorMsg = "Verification failed.";
        if (
          err &&
          typeof err === "object" &&
          "response" in err &&
          err.response &&
          typeof err.response === "object" &&
          "data" in err.response &&
          err.response.data &&
          typeof err.response.data === "object" &&
          "message" in err.response.data
        ) {
          errorMsg =
            (err.response.data as { message?: string }).message || errorMsg;
        }
        setStatus("error");
        setMessage(errorMsg);
        notify(errorMsg, "error");
      }
    };

    verify();
  }, [notify, router]); // Only run once on mount

  return (
    <div className="max-w-md mx-auto p-8 mt-16 text-center text-white">
      {status === "pending" && (
        <p className="text-zinc-300">Verifying your email...</p>
      )}
      {status === "success" && <p className="text-emerald-400">{message}</p>}
      {status === "error" && <p className="text-rose-400">{message}</p>}
    </div>
  );
}

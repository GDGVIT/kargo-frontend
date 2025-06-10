"use client";

import Branding from "./Branding/Branding";
import AuthTabs from "./AuthTabs/AuthTabs";
import AuthForm from "./AuthForm/AuthForm";
import OAuthButtons from "./OAuthButtons/OAuthButtons";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import useNotification from "../../ui/Notification/Notification";
import { baseURL } from "../../../utils/api";
import { useRouter } from "next/navigation";

export default function Authenticate() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const { login, register, user } = useAuth();
  const { notify } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/profile");
    }
  }, [user, router]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedName = name.trim();
    const trimmedUsername = username.trim();

    if (isLogin) {
      if (!trimmedEmail || !trimmedPassword) {
        notify("Please fill in all fields.", "warning");
        return;
      }
    } else {
      if (
        !trimmedEmail ||
        !trimmedPassword ||
        !trimmedName ||
        !trimmedUsername
      ) {
        notify("Please fill in all fields.", "warning");
        return;
      }
    }

    if (!validateEmail(trimmedEmail)) {
      notify("Please enter a valid email address.", "warning");
      return;
    }

    if (trimmedPassword.length < 6) {
      notify("Password must be at least 6 characters.", "warning");
      return;
    }

    setLoading(true);

    try {
      let response;
      if (isLogin) {
        response = await login(trimmedEmail, trimmedPassword);
      } else {
        response = await register(
          trimmedEmail,
          trimmedPassword,
          trimmedName,
          trimmedUsername
        );
      }

      if (response && response.success) {
        notify(
          response.message ||
            (isLogin
              ? `Logged in successfully! Welcome, ${
                  user?.name || user?.email || ""
                }!`
              : "Registered successfully. Please check your email to verify."),
          "success"
        );
        if (!isLogin) setIsLogin(true);
        setEmail("");
        setPassword("");
        setName("");
        setUsername("");
      } else {
        notify(response?.message || "Something went wrong.", "error");
      }
    } catch (err: unknown) {
      let errorMsg = "Unexpected error.";
      if (err && typeof err === "object") {
        if (
          "message" in err &&
          typeof (err as { message: string }).message === "string"
        ) {
          errorMsg = (err as { message: string }).message;
        }
      }
      notify(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => {
    setOauthLoading(true);
    window.location.href = `${baseURL}/api/auth/google`;
  };

  const githubLogin = () => {
    setOauthLoading(true);
    window.location.href = `${baseURL}/api/auth/github`;
  };

  return (
    <section className="flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl bg-[var(--card-background)] rounded-3xl p-0 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Branding/Illustration */}
        <Branding />
        {/* Right Side: Auth Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          {/* Tabs */}
          <AuthTabs isLogin={isLogin} setIsLogin={setIsLogin} />

          {/* Animated height wrapper for form content */}
          <AuthForm
            isLogin={isLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            name={name}
            setName={setName}
            username={username}
            setUsername={setUsername}
            loading={loading}
            handleSubmit={handleSubmit}
          />

          <div className="flex items-center justify-center my-6 gap-3">
            <div className="h-px flex-grow bg-neutral-700" />
            <span className="text-xs text-zinc-400">or continue with</span>
            <div className="h-px flex-grow bg-neutral-700" />
          </div>

          {/* OAuth Buttons - now compact, icon-only, in a row */}
          <OAuthButtons
            googleLogin={googleLogin}
            githubLogin={githubLogin}
            oauthLoading={oauthLoading}
          />
        </div>
      </div>
    </section>
  );
}

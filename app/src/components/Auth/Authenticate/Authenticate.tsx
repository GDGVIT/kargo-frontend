"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "../../ui/Notification/Notification";
import {
  FaUser,
  FaUserCircle,
  FaLock,
  FaEnvelope,
  FaGithub,
} from "react-icons/fa";
import { baseURL } from "../../../utils/api";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

const Input = ({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
}) => (
  <div className="flex items-center px-4 py-2 mb-3 w-full max-w-lg">
    <span className="text-zinc-400 mr-4">{icon}</span>
    <input
      className="bg-transparent outline-none w-full text-white placeholder-zinc-500 text-lg"
      {...props}
    />
  </div>
);

const tabVariants = {
  active: { borderBottomWidth: 3, borderColor: "#38bdf8" },
  inactive: { borderBottomWidth: 0, borderColor: "transparent" },
};

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
    // Trim inputs for validation
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedName = name.trim();
    const trimmedUsername = username.trim();

    // Check mandatory fields
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

    // Email validation
    if (!validateEmail(trimmedEmail)) {
      notify("Please enter a valid email address.", "warning");
      return;
    }

    // Password length check
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
              ? "Logged in successfully!"
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
    <section className="min-h-screen flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-[var(--card-background)] rounded-3xl p-0 flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left Side: Branding/Illustration */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-sky-900 to-gray-900 w-1/2 p-10 text-white relative">
          <div className="flex flex-col items-center gap-6">
            <Image
              src="/icons/icon-192x192.webp"
              alt="Kargo Logo"
              width={96}
              height={96}
              className="w-24 h-24 rounded-2xl shadow-lg"
            />
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome to Kargo
            </h2>
            <p className="text-lg text-sky-200 text-center max-w-xs">
              Deploy, manage, and scale your applications with ease. Login or
              create an account to get started!
            </p>
          </div>
          <div className="absolute bottom-6 left-0 w-full text-center text-xs text-sky-300 opacity-60">
            © {new Date().getFullYear()} Kargo
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          {/* Tabs */}
          <div className="flex justify-center mb-8 gap-20 border-b border-neutral-700">
            <motion.button
              type="button"
              onClick={() => setIsLogin(true)}
              className="text-xl font-semibold text-slate-100 pb-3 px-6"
              animate={isLogin ? "active" : "inactive"}
              variants={tabVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              Login
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setIsLogin(false)}
              className="text-xl font-semibold text-slate-100 pb-3 px-6"
              animate={!isLogin ? "active" : "inactive"}
              variants={tabVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              Sign Up
            </motion.button>
          </div>

          {/* Animated height wrapper for form content */}
          <motion.div layout transition={{ duration: 0.4, type: "spring" }}>
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    icon={<FaEnvelope />}
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                  <Input
                    icon={<FaLock />}
                    placeholder="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    icon={<FaUserCircle />}
                    placeholder="Full Name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                  <Input
                    icon={<FaUser />}
                    placeholder="Username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                  />
                  <Input
                    icon={<FaEnvelope />}
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                  <div className="relative w-full max-w-lg">
                    <Input
                      icon={<FaLock />}
                      placeholder="Password (min 6 characters)"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      style={{ paddingRight: "2.5rem" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="py-2 rounded-xl bg-sky-600 hover:bg-sky-700 transition duration-300 disabled:opacity-50 text-lg font-semibold text-white shadow-lg w-48 block"
                type="button"
              >
                {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
              </button>
            </div>
          </motion.div>

          <div className="flex items-center justify-center my-6 gap-3">
            <div className="h-px flex-grow bg-neutral-700" />
            <span className="text-xs text-zinc-400">or continue with</span>
            <div className="h-px flex-grow bg-neutral-700" />
          </div>

          {/* OAuth Buttons - now compact, icon-only, in a row */}
          <div className="flex flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <button
              onClick={googleLogin}
              aria-label="Continue with Google"
              disabled={oauthLoading}
              className="flex items-center justify-center p-3 rounded-full text-gray text-lg"
              type="button"
            >
              <FcGoogle className="w-6 h-6" />
            </button>

            <button
              onClick={githubLogin}
              aria-label="Continue with GitHub"
              disabled={oauthLoading}
              className="flex items-center justify-center p-3 rounded-full text-white text-lg"
              type="button"
            >
              <FaGithub className="w-6 h-6" />
            </button>
          </div>

          {user && (
            <div className="text-center text-sm text-emerald-400 mt-8">
              Welcome, {user.name || user.email}!
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

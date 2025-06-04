"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "../../Notification/Notification";
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

const Input = ({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
}) => (
  <div className="flex items-center bg-neutral-800 border border-neutral-700 rounded px-4 py-3 mb-5 w-full max-w-lg">
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
  const [confirmPassword, setConfirmPassword] = useState("");
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
    const trimmedConfirmPassword = confirmPassword.trim();

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
        !trimmedConfirmPassword ||
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

    // Confirm password match check for signup
    if (!isLogin && trimmedPassword !== trimmedConfirmPassword) {
      notify("Passwords do not match.", "warning");
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

      if (response === true) {
        notify(
          isLogin
            ? "Logged in successfully!"
            : "Registered successfully. Please check your email to verify.",
          "success"
        );
        if (!isLogin) setIsLogin(true);

        // Clear inputs
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        setUsername("");
      } else {
        notify("Something went wrong.", "error");
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
    <section className="min-h-screen flex items-center justify-center bg-neutral-950 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-neutral-900 rounded-3xl p-10 border border-neutral-800 shadow-2xl"
      >
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
            Sign In
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
              <Input
                icon={<FaLock />}
                placeholder="Password (min 6 chars)"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <Input
                icon={<FaLock />}
                placeholder="Confirm Password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 mt-6 rounded-xl bg-sky-600 hover:bg-sky-700 transition duration-300 disabled:opacity-50 text-lg font-semibold text-white shadow-lg"
          type="button"
        >
          {loading ? "Please wait..." : isLogin ? "Sign In" : "Register"}
        </button>

        <div className="flex items-center justify-center my-6 gap-3">
          <div className="h-px flex-grow bg-neutral-700" />
          <span className="text-xs text-zinc-400">or continue with</span>
          <div className="h-px flex-grow bg-neutral-700" />
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-4 max-w-lg mx-auto">
          <button
            onClick={googleLogin}
            aria-label="Continue with Google"
            disabled={oauthLoading}
            className="flex w-full items-center justify-center gap-4 py-3 px-5 rounded-xl border border-gray-300 bg-white text-gray-900 shadow hover:shadow-lg transition disabled:opacity-50 text-lg font-semibold"
            type="button"
          >
            <FcGoogle className="w-6 h-6" />
            <span>Google</span>
          </button>

          <button
            onClick={githubLogin}
            aria-label="Continue with GitHub"
            disabled={oauthLoading}
            className="flex w-full items-center justify-center gap-4 py-3 px-5 rounded-xl border border-gray-800 bg-gray-900 text-white shadow hover:brightness-110 transition disabled:opacity-50 text-lg font-semibold"
            type="button"
          >
            <FaGithub className="w-6 h-6" />
            <span>GitHub</span>
          </button>
        </div>

        {user && (
          <div className="text-center text-sm text-emerald-400 mt-8">
            Welcome, {user.name || user.email}!
          </div>
        )}
      </motion.div>
    </section>
  );
}

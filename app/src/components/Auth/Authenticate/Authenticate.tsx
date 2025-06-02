"use client";

import { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { motion } from "framer-motion";
import {
  useNotification,
  NotificationProvider,
} from "../../Notification/Notification";
import {
  FaGoogle,
  FaUser,
  FaUserCircle,
  FaLock,
  FaEnvelope,
  FaGithub,
} from "react-icons/fa";
import { baseURL } from "../../../utils/api";

const Input = ({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
}) => (
  <div className="flex items-center bg-neutral-800 border border-neutral-700 rounded px-3 py-2">
    <span className="text-zinc-400 mr-2">{icon}</span>
    <input
      className="bg-transparent outline-none w-full text-white placeholder-zinc-500"
      {...props}
    />
  </div>
);

export default function Authenticate() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const { login, register, user } = useAuth();
  const { notify } = useNotification();

  const handleSubmit = async () => {
    if (
      (isLogin && (!email || !password)) ||
      (!isLogin && (!email || !password || !name || !username))
    ) {
      notify("Please fill in all fields.", "warning");
      return;
    }

    let success = false;

    if (isLogin) {
      success = await login(email, password);
    } else {
      success = await register(email, password, name, username);
    }

    if (success) {
      notify(isLogin ? "Logged in!" : "Registered and logged in!", "success");
      setEmail("");
      setPassword("");
      setName("");
      setUsername("");
    } else {
      notify(isLogin ? "Login failed" : "Registration failed", "error");
    }
  };

  const googleLogin = () => {
    window.location.href = `${baseURL}/api/auth/google`;
  };

  const githubLogin = () => {
    window.location.href = `${baseURL}/api/auth/github`;
  };

  return (
    <NotificationProvider>
      <section className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full min-w-sm max-w-md bg-neutral-900 rounded-2xl p-8 border border-neutral-800 space-y-6 shadow-2xl"
        >
          <h1 className="text-3xl font-semibold text-center text-slate-100">
            {isLogin ? "Sign In" : "Register"}
          </h1>

          {!isLogin && (
            <Input
              icon={<FaUserCircle />}
              placeholder="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {!isLogin && (
            <Input
              icon={<FaUser />}
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <Input
            icon={<FaEnvelope />}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={<FaLock />}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl font-medium bg-slate-800 text-white hover:bg-slate-700 transition duration-300"
          >
            {isLogin ? "Sign In" : "Register"}
          </button>

          <div className="flex items-center justify-center my-2 gap-2">
            <div className="h-px w-full bg-neutral-700" />
            <span className="text-xs text-zinc-400">or</span>
            <div className="h-px w-full bg-neutral-700" />
          </div>

          <button
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl font-medium bg-white text-neutral-900 hover:bg-neutral-200 transition duration-300 border border-neutral-300 mb-2"
            type="button"
          >
            <FaGoogle />
            Continue with Google
          </button>

          <button
            onClick={githubLogin}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl font-medium bg-neutral-800 text-white hover:bg-neutral-700 transition duration-300 border border-neutral-700"
            type="button"
          >
            <FaGithub className="w-5 h-5" />
            Continue with GitHub
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              className="text-sky-400 hover:underline text-sm"
              onClick={() => setIsLogin((v) => !v)}
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Sign In"}
            </button>
          </div>

          {user && (
            <div className="text-center text-sm text-emerald-400">
              Welcome, {user.name || user.email}!
            </div>
          )}
        </motion.div>
      </section>
    </NotificationProvider>
  );
}

"use client";

import { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { motion } from "framer-motion";
import { useNotification } from "../../Notification/Notification";
import {
  FaGoogle,
  FaUser,
  FaUserCircle,
  FaLock,
  FaEnvelope,
} from "react-icons/fa";

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
    window.location.href = `${process.env.NEXTAUTH_URL}/api/auth/google`;
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full min-w-sm max-w-md bg-neutral-900 rounded-2xl p-8 border border-neutral-800 space-y-6 shadow-2xl"
      >
        <h1 className="text-3xl font-semibold text-center text-slate-100">
          {isLogin ? "Login" : "Register"}
        </h1>

        {!isLogin && (
          <>
            <Input
              icon={<FaUserCircle />}
              placeholder="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              icon={<FaUser />}
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </>
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
          {isLogin ? "Login" : "Register"}
        </button>

        <div className="flex items-center justify-center my-2">
          <div className="h-px w-full bg-neutral-700" />
          <span className="mx-3 text-sm text-zinc-500">or</span>
          <div className="h-px w-full bg-neutral-700" />
        </div>

        <button
          onClick={googleLogin}
          className="flex items-center justify-center gap-3 w-full py-3 rounded-xl font-medium bg-neutral-800 text-zinc-200 hover:bg-neutral-700 transition duration-300 border border-neutral-700"
        >
          <FaGoogle className="text-lg" />
          Continue with Google
        </button>

        <p className="text-sm text-center text-neutral-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:text-blue-300 ml-1"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

        {user && (
          <div className="text-center text-sm text-emerald-400">
            Welcome, {user.name || user.email}!
          </div>
        )}
      </motion.div>
    </section>
  );
}

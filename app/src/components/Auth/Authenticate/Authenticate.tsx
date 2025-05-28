"use client";

import { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { motion } from "framer-motion";
import { useNotification } from "../../Notification/Notification";

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
        className="w-full max-w-md bg-neutral-900 rounded-xl p-6 border border-neutral-800 space-y-5"
      >
        <h1 className="text-3xl font-semibold text-center">
          {isLogin ? "Login" : "Register"}
        </h1>

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Name"
              className="bg-neutral-800 p-3 w-full rounded text-white placeholder-neutral-500 border border-neutral-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="bg-neutral-800 p-3 w-full rounded text-white placeholder-neutral-500 border border-neutral-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          className="bg-neutral-800 p-3 w-full rounded text-white placeholder-neutral-500 border border-neutral-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-neutral-800 p-3 w-full rounded text-white placeholder-neutral-500 border border-neutral-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl font-medium bg-white text-neutral-950 hover:bg-neutral-200 transition duration-300"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <button
          onClick={googleLogin}
          className="w-full py-3 rounded-xl font-medium bg-red-600 text-white hover:bg-red-500 transition duration-300"
        >
          Continue with Google
        </button>

        <p className="text-sm text-center text-neutral-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 underline hover:text-blue-400"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

        {user && (
          <div className="text-center text-sm text-green-400">
            Welcome, {user.name || user.email}!
          </div>
        )}
      </motion.div>
    </section>
  );
}

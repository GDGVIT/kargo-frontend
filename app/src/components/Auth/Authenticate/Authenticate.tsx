"use client";

import { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";

export default function Authenticate() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register } = useAuth();

  const handleSubmit = async () => {
    const success = isLogin
      ? await login(email, password)
      : await register(email, password);
    if (success) {
      alert(isLogin ? "Logged in!" : "Registered and logged in!");
      setEmail("");
      setPassword("");
    } else {
      alert(isLogin ? "Login failed" : "Registration failed");
    }
  };

  const googleLogin = () => {
    window.location.href = `${process.env.NEXTAUTH_URL}/api/auth/google`;
  };

  return (
    <div className="p-6 space-y-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold">{isLogin ? "Login" : "Register"}</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className={`w-full px-4 py-2 rounded text-white ${
          isLogin ? "bg-blue-500" : "bg-green-500"
        }`}
      >
        {isLogin ? "Login" : "Register"}
      </button>

      <button
        onClick={googleLogin}
        className="w-full bg-red-500 text-white px-4 py-2 rounded"
      >
        Continue with Google
      </button>

      <p className="text-sm text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}

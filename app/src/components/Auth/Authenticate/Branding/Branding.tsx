"use client";

import Image from "next/image";

export default function Branding() {
  return (
    <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-sky-900 to-gray-900 w-1/2 p-10 text-white relative">
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/icon.svg"
          alt="Kargo Logo"
          width={96}
          height={96}
          className="w-24 h-24"
          style={{ boxShadow: "none" }}
        />
        <h2 className="text-3xl font-bold tracking-tight">Welcome to Kargo</h2>
        <p className="text-lg text-sky-200 text-center max-w-xs">
          Deploy, manage, and scale your applications with ease. Login or create
          an account to get started!
        </p>
      </div>
      <div className="absolute bottom-6 left-0 w-full text-center text-xs text-sky-300 opacity-60">
        © 2025 Kargo
      </div>
    </div>
  );
}

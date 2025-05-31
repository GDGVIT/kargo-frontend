"use client";

export default function Branding() {
  return (
    <div
      className="flex items-center space-x-3 cursor-pointer"
      onClick={() => (window.location.href = "/")}
    >
      <div className="text-2xl font-bold text-white">
        <span className="text-blue-500">Kargo</span>
      </div>
      <span className="hidden md:inline text-sm text-zinc-400 font-light pl-2 border-l border-zinc-700">
        AI-Powered App Deployment Platform
      </span>
    </div>
  );
}

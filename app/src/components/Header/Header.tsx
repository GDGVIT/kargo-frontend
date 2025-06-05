import Auth from "./Auth/Auth";
import Branding from "./Branding/Branding";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-zinc-900 border-b border-zinc-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Branding />
        <div className="flex items-center space-x-2">
          <Link
            href="/dashboard"
            className="px-3 py-2 text-sm text-zinc-300 hover:text-white transition rounded-md hover:bg-zinc-800"
          >
            Dashboard
          </Link>
          <Link
            href="/dockerize"
            className="px-3 py-2 text-sm text-zinc-300 hover:text-white transition rounded-md hover:bg-zinc-800"
          >
            Dockerize
          </Link>
          <div className="px-3 py-2">
            <Auth />
          </div>
        </div>
      </div>
    </header>
  );
}

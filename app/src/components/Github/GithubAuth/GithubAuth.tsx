"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import api, { baseURL } from "../../../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import gsap from "gsap";

function InstallButton() {
  return (
    <a
      href={`${baseURL}/api/github/install`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white rounded-lg font-semibold shadow-lg transition-all duration-200"
    >
      <FaGithub size={22} />
      Connect GitHub
    </a>
  );
}

function ReinstallButton() {
  return (
    <a
      href={`${baseURL}/api/github/install`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white rounded-lg font-semibold shadow-lg transition-all duration-200"
    >
      <FaGithub size={22} />
      Reinstall GitHub App
    </a>
  );
}

const GithubAuth: React.FC = () => {
  const [installationIds, setInstallationIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAndSyncInstallationIds = async () => {
      try {
        const res = await api.get("/api/github/installation-id", {
          withCredentials: true,
        });

        const savedInstallationIds: string[] = res.data.installation_ids || [];

        const url = new URL(window.location.href);
        const paramId = url.searchParams.get("installation_id");
        const sessionId = sessionStorage.getItem("installation_ids");
        let idsFromClient: string[] = [];

        if (paramId) idsFromClient.push(paramId);
        else if (sessionId) idsFromClient = JSON.parse(sessionId);

        const allInstallationIds = Array.from(
          new Set([...savedInstallationIds, ...idsFromClient])
        );

        const newIdsToSave = allInstallationIds.filter(
          (id) => !savedInstallationIds.includes(id)
        );

        for (const id of newIdsToSave) {
          await api.post(
            "/api/github/installation-id",
            { installation_id: id },
            { withCredentials: true }
          );
        }

        setInstallationIds(allInstallationIds);
        sessionStorage.setItem(
          "installation_ids",
          JSON.stringify(allInstallationIds)
        );

        if (paramId) {
          url.searchParams.delete("installation_id");
          window.history.replaceState(null, "", url.toString());
        }
      } catch (err) {
        console.error("Error loading GitHub installation IDs:", err);
        setError("Failed to load GitHub installation info.");
      }
    };

    fetchAndSyncInstallationIds();
  }, []);

  useEffect(() => {
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { scale: 0.7, rotate: -20, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [installationIds.length]);

  const isConnected = installationIds.length > 0;

  return (
    <>
      <div className="flex flex-col items-center gap-2 mb-6">
        <div ref={iconRef}>
          <FaGithub size={48} className="text-white drop-shadow-lg" />
        </div>
        <motion.h2
          className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isConnected ? (
            <>
              <FaCheckCircle className="text-green-400" /> GitHub Connected
            </>
          ) : (
            <>
              <FaGithub className="text-white" /> Connect GitHub
            </>
          )}
        </motion.h2>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            className="mb-4 text-red-400 font-medium text-center flex items-center gap-2 justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <FaExclamationCircle className="text-red-400" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isConnected ? (
          <motion.div
            key="connected"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-zinc-300 mb-5 text-center">
              GitHub connected with{" "}
              <span className="font-bold text-sky-400">
                {installationIds.length}
              </span>{" "}
              installation
              {installationIds.length > 1 ? "s" : ""}.
              <Link
                href="/dashboard"
                className="text-sky-400 underline hover:text-sky-300 font-medium"
              >
                Go to dashboard
              </Link>
              . .
            </p>
            <div className="flex justify-center">
              <ReinstallButton />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="not-connected"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-center">
              <InstallButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GithubAuth;

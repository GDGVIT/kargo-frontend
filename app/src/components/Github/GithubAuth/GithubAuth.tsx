"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import api, { baseURL } from "../../../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExclamationCircle } from "react-icons/fa";
import gsap from "gsap";
import AnimatedButton from "../../ui/AnimatedButton/AnimatedButton";

function InstallButton() {
  return (
    <AnimatedButton
      onClick={() =>
        window.open(
          `${baseURL}/api/github/install`,
          "_blank",
          "noopener,noreferrer"
        )
      }
      icon={<FaGithub size={22} />}
      className="px-5 py-2.5"
      type="button"
      variant="primary"
    >
      Connect GitHub
    </AnimatedButton>
  );
}

function ReinstallButton() {
  return (
    <AnimatedButton
      onClick={() =>
        window.open(
          `${baseURL}/api/github/install`,
          "_blank",
          "noopener,noreferrer"
        )
      }
      icon={<FaGithub size={22} />}
      className="px-5 py-2.5"
      type="button"
      variant="primary"
    >
      Reinstall GitHub App
    </AnimatedButton>
  );
}

const GithubAuth: React.FC = () => {
  const [installationIds, setInstallationIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAndSyncInstallationIds = async () => {
      try {
        const url = new URL(window.location.href);
        const installationIdFromUrl = url.searchParams.get("installation_id");
        if (installationIdFromUrl) {
          try {
            await api.post(
              "/api/github/installation-id",
              { installation_id: installationIdFromUrl },
              { withCredentials: true }
            );
          } catch (err) {
            console.error("Error saving GitHub installation ID:", err);
            setError("Failed to save GitHub installation ID.");
          }
        }

        const res = await api.get("/api/github/installation-id", {
          withCredentials: true,
        });

        const savedInstallationIds: string[] = res.data.installation_ids || [];

        // Always trust backend as source of truth
        setInstallationIds(savedInstallationIds);
        sessionStorage.setItem(
          "installation_ids",
          JSON.stringify(savedInstallationIds)
        );

        // Remove installation_id param from URL if present
        if (installationIdFromUrl) {
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
              <br />
              <Link
                href="/dockerize"
                className="text-sky-400 underline hover:text-sky-300 font-medium"
              >
                Dockerize your app!
              </Link>
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

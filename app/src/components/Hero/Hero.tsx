"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen  text-white flex items-center justify-center px-6">
      <div className="max-w-5xl w-full text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-white"
        >
          Seamless Docker App Deployment.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto"
        >
          Kargo lets you deploy containerized applications with full flexibility
          — AI-powered setup, secure infrastructure, and Kubernetes-native
          scaling, all from a powerful web interface.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <Link
            href="/profile"
            className="inline-block px-6 py-3 rounded-xl bg-white text-neutral-950 font-medium hover:bg-neutral-200 transition duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

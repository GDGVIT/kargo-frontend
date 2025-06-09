"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Marquee from "react-fast-marquee";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full px-6 text-white">
      <div className="max-w-5xl w-full text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-white"
        >
          Kargo
        </motion.h1>

        <Marquee
          gradient={true}
          gradientColor="var(--background)"
          gradientWidth={60}
          speed={25}
          className="my-8 text-xl md:text-2xl font-semibold text-gray-300 max-w-2xl mx-auto"
        >
          Effortless Docker Application
          Deployment&nbsp;&nbsp;|&nbsp;&nbsp;Enterprise-Grade
          Security&nbsp;&nbsp;|&nbsp;&nbsp;Automated, AI-Driven
          Configuration&nbsp;&nbsp;|&nbsp;&nbsp;Kubernetes-Native
          Scalability&nbsp;&nbsp;|&nbsp;&nbsp;Robust Infrastructure
          Management&nbsp;&nbsp;|&nbsp;&nbsp;Accelerate Your Cloud Journey
        </Marquee>

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

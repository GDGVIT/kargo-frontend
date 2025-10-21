'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center w-full text-white"
      style={{
        padding: `var(--padding-large) var(--screen-horizontal-margin)`,
        minHeight: '90vh',
      }}
    >
      <div className="max-w-5xl w-full text-center" style={{ gap: 'var(--margin-large)' }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-semibold leading-tight tracking-tight"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            color: 'var(--foreground)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: 'var(--margin-medium)',
          }}
        >
          Kargo
        </motion.h1>

        <Marquee
          gradient={true}
          gradientColor="var(--background)"
          gradientWidth={60}
          speed={25}
          className="font-semibold max-w-2xl mx-auto"
          style={{
            fontSize: 'var(--font-size-large)',
            color: '#a0aec0',
            margin: `var(--margin-large) auto`,
            fontWeight: 'var(--font-weight-normal)',
          }}
        >
          Effortless Docker Application Deployment&nbsp;&nbsp;|&nbsp;&nbsp;Enterprise-Grade
          Security&nbsp;&nbsp;|&nbsp;&nbsp;Automated, AI-Driven
          Configuration&nbsp;&nbsp;|&nbsp;&nbsp;Kubernetes-Native
          Scalability&nbsp;&nbsp;|&nbsp;&nbsp;Robust Infrastructure
          Management&nbsp;&nbsp;|&nbsp;&nbsp;Accelerate Your Cloud Journey
        </Marquee>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-2xl mx-auto"
          style={{
            fontSize: 'var(--font-size-medium)',
            color: '#7b8191',
            fontWeight: 'var(--font-weight-normal)',
            marginBottom: 'var(--margin-large)',
            lineHeight: '1.6',
          }}
        >
          Kargo lets you deploy containerized applications with full flexibility — AI-powered setup,
          secure infrastructure, and Kubernetes-native scaling, all from a powerful web interface.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex flex-col sm:flex-row justify-center items-center responsive-flex-center"
          style={{ gap: 'var(--margin-medium)' }}
        >
          <Link
            href="/settings"
            className="inline-block font-medium"
            style={{
              padding: `var(--padding-small) var(--padding-medium)`,
              borderRadius: 'var(--border-radius-medium)',
              backgroundColor: 'var(--foreground)',
              color: 'var(--background)',
              fontWeight: 'var(--font-weight-bold)',
              transition: 'all var(--transition-fast)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e0e6f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--foreground)';
            }}
          >
            Get Started
          </Link>
          <Link
            href="/docs"
            className="inline-block font-medium"
            style={{
              padding: `var(--padding-small) var(--padding-medium)`,
              borderRadius: 'var(--border-radius-medium)',
              border: '2px solid #3a4152',
              color: 'var(--foreground)',
              fontWeight: 'var(--font-weight-normal)',
              transition: 'all var(--transition-fast)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-background)';
              e.currentTarget.style.borderColor = '#4e5a76';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#3a4152';
            }}
          >
            Documentation
          </Link>
        </motion.div>
      </div>

      <motion.a
        href="#features"
        aria-label="Scroll to features"
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: [0.55, 0.85, 0.55], y: [0, 3, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px',
          color: '#a0aec0',
          textDecoration: 'none',
          transition: 'color var(--transition-fast), opacity var(--transition-fast)',
          opacity: 0.8,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--theme-blue)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#a0aec0';
          e.currentTarget.style.opacity = '0.8';
        }}
      >
        <ChevronDown size={18} />
      </motion.a>
    </section>
  );
}

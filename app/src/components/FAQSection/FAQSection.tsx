'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import faqs from '@/data/faq';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      style={{
        padding: `var(--padding-huge) var(--screen-horizontal-margin)`,
        backgroundColor: 'var(--background)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
        style={{
          marginBottom: 'var(--margin-huge)',
        }}
      >
        <h2
          style={{
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            marginBottom: 'var(--margin-medium)',
            marginTop: 0,
          }}
        >
          Frequently Asked Questions
        </h2>
        <p
          style={{
            fontSize: 'var(--font-size-medium)',
            color: '#7b8191',
            lineHeight: '1.7',
          }}
        >
          Everything you need to know about Kargo
        </p>
      </motion.div>

      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            style={{
              marginBottom: 'var(--margin-medium)',
              backgroundColor: 'var(--card-background)',
              borderRadius: 'var(--border-radius-medium)',
              border: '2px solid #3a4152',
              overflow: 'hidden',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              if (openIndex === index) {
                e.currentTarget.style.borderColor = 'var(--theme-blue)';
              }
            }}
            onMouseLeave={(e) => {
              if (openIndex === index) {
                e.currentTarget.style.borderColor = 'var(--theme-blue)';
              } else {
                e.currentTarget.style.borderColor = '#3a4152';
              }
            }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              style={{
                width: '100%',
                padding: 'var(--padding-medium) var(--padding-large)',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--foreground)',
                fontSize: 'var(--font-size-medium)',
                fontWeight: 'var(--font-weight-bold)',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 'var(--margin-medium)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--theme-blue)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--foreground)';
              }}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span>{faq.question}</span>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: 'var(--font-size-large)',
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                ↓
              </motion.span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      padding: `0 var(--padding-large) var(--padding-large) var(--padding-large)`,
                      color: '#a0aec0',
                      fontSize: 'var(--font-size-medium)',
                      lineHeight: '1.7',
                    }}
                  >
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center"
        style={{
          marginTop: 'var(--margin-huge)',
          padding: 'var(--padding-large)',
          backgroundColor: 'var(--card-background)',
          borderRadius: 'var(--border-radius-large)',
          border: '2px solid #3a4152',
          maxWidth: '900px',
          margin: 'var(--margin-huge) auto 0',
        }}
      >
        <h3
          style={{
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            marginBottom: 'var(--margin-medium)',
            marginTop: 0,
          }}
        >
          Still have questions?
        </h3>
        <p
          style={{
            fontSize: 'var(--font-size-medium)',
            color: '#a0aec0',
            marginBottom: 'var(--margin-large)',
          }}
        >
          Check out our comprehensive documentation or reach out to the GDG-VIT team.
        </p>
        <div
          className="flex flex-col sm:flex-row justify-center items-center responsive-flex-center"
          style={{ gap: 'var(--margin-medium)' }}
        >
          <a
            href="/docs"
            style={{
              display: 'inline-block',
              padding: `var(--padding-small) var(--padding-large)`,
              borderRadius: 'var(--border-radius-medium)',
              backgroundColor: 'var(--theme-blue)',
              color: 'var(--background)',
              fontWeight: 'var(--font-weight-bold)',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
              fontSize: 'var(--font-size-medium)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0fc5c0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--theme-blue)';
            }}
          >
            View Documentation
          </a>
          <a
            href="https://github.com/GDGVIT/kargo-frontend"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: `var(--padding-small) var(--padding-large)`,
              borderRadius: 'var(--border-radius-medium)',
              border: '2px solid var(--theme-blue)',
              color: 'var(--theme-blue)',
              fontWeight: 'var(--font-weight-bold)',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
              fontSize: 'var(--font-size-medium)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(18, 214, 209, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            GitHub Repository
          </a>
        </div>
      </motion.div>
    </section>
  );
}

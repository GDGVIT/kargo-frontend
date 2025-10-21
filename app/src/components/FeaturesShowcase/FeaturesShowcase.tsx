'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import features, { Feature, Slide } from '@/data/features';

interface FeatureSectionProps {
  feature: Feature;
  index: number;
  reverse?: boolean;
}

const FeatureSection = ({ feature, index, reverse = false }: FeatureSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Slider setup: supports multiple slides per feature
  const [current, setCurrent] = useState(0);
  const slides: Slide[] = useMemo(() => {
    if (Array.isArray(feature.slides) && feature.slides.length > 0) {
      return feature.slides as Slide[];
    }
    if (feature.image && feature.imageAlt) {
      return [{ image: feature.image, imageAlt: feature.imageAlt }];
    }
    return [];
  }, [feature]);
  const activeSlide = slides.length ? slides[Math.min(current, slides.length - 1)] : undefined;
  const goPrev = () => slides.length && setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const goNext = () => slides.length && setCurrent((p) => (p + 1) % slides.length);

  // Preload slide images to prevent flash/flicker on navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    slides.forEach((s) => {
      if (!s?.image) return;
      const img = new window.Image();
      img.src = s.image;
    });
  }, [slides]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}
      style={{
        padding: 'var(--padding-large) 0',
        borderBottom: '1px solid #3a4152',
      }}
    >
      <motion.div
        className="w-full lg:w-1/2"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '75%',
            borderRadius: 'var(--border-radius-medium)',
            overflow: 'hidden',
            border: '2px solid #3a4152',
            boxShadow: 'var(--box-shadow-default)',
            backgroundColor: 'var(--card-background)',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {activeSlide && (
              <motion.div
                key={activeSlide.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  willChange: 'opacity',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
              >
                <Image
                  src={activeSlide.image}
                  alt={activeSlide.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: 'contain', userSelect: 'none', pointerEvents: 'none' }}
                  priority={index === 0 && current === 0}
                  draggable={false}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {slides.length > 1 && (
            <div>
              <button
                aria-label="Previous"
                onClick={goPrev}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0.5rem',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid #3a4152',
                  color: 'var(--foreground)',
                  padding: '6px',
                  borderRadius: '9999px',
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                aria-label="Next"
                onClick={goNext}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0.5rem',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid #3a4152',
                  color: 'var(--foreground)',
                  padding: '6px',
                  borderRadius: '9999px',
                }}
              >
                <ChevronRight size={18} />
              </button>

              <div
                style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '0.4rem',
                  padding: '0.25rem 0.5rem',
                  background: 'rgba(0,0,0,0.25)',
                  borderRadius: '9999px',
                  border: '1px solid #3a4152',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {slides.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: i === current ? '16px' : '8px',
                      height: '8px',
                      borderRadius: '9999px',
                      background: i === current ? 'var(--theme-blue)' : '#7b8191',
                      transition: 'all var(--transition-fast)',
                      border: 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <h3
          style={{
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            marginTop: 0,
            marginBottom: 'var(--margin-small)',
          }}
        >
          {activeSlide?.title ? `${feature.title}: ${activeSlide.title}` : feature.title}
        </h3>
        <p
          style={{
            fontSize: 'var(--font-size-medium)',
            color: '#a0aec0',
            lineHeight: '1.7',
            marginBottom: 'var(--margin-medium)',
          }}
        >
          {activeSlide?.description || feature.description}
        </p>

        {((activeSlide?.highlights && activeSlide.highlights.length > 0) ||
          (feature.highlights && feature.highlights.length > 0)) && (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--margin-small)',
            }}
          >
            {(activeSlide?.highlights || feature.highlights || []).map((highlight, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 + idx * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--margin-small)',
                  color: '#e0e6f0',
                  fontSize: 'var(--font-size-medium)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--theme-blue)',
                    flexShrink: 0,
                  }}
                />
                {highlight}
              </motion.li>
            ))}
          </ul>
        )}

        {feature.ctaText && feature.ctaLink && (
          <Link
            href={feature.ctaLink}
            style={{
              display: 'inline-block',
              width: 'fit-content',
              marginTop: 'var(--margin-medium)',
              padding: `var(--padding-small) var(--padding-medium)`,
              borderRadius: 'var(--border-radius-medium)',
              backgroundColor: 'var(--theme-blue)',
              color: 'var(--background)',
              fontWeight: 'var(--font-weight-bold)',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0fc5c0';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--theme-blue)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {feature.ctaText} →
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default function FeaturesShowcase() {
  return (
    <section
      id="features"
      style={{
        padding: `var(--padding-huge) var(--screen-horizontal-margin)`,
        backgroundColor: 'var(--background)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
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
          Everything You Need to Deploy
        </h2>
        <p
          style={{
            fontSize: 'var(--font-size-medium)',
            color: '#7b8191',
            lineHeight: '1.7',
          }}
        >
          From AI-powered containerization to advanced Kubernetes management, Kargo provides a
          complete platform for modern application deployment.
        </p>
      </motion.div>

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {features.map((feature, index) => (
          <FeatureSection key={index} feature={feature} index={index} reverse={index % 2 !== 0} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center"
        style={{
          marginTop: 'var(--margin-huge)',
          padding: 'var(--padding-large)',
          backgroundColor: 'var(--card-background)',
          borderRadius: 'var(--border-radius-large)',
          border: '2px solid #3a4152',
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
          Ready to Get Started?
        </h3>
        <p
          style={{
            fontSize: 'var(--font-size-medium)',
            color: '#a0aec0',
            marginBottom: 'var(--margin-large)',
          }}
        >
          Deploy your first application in minutes with Kargo&apos;s intuitive platform.
        </p>
        <div
          className="flex flex-col sm:flex-row justify-center items-center responsive-flex-center"
          style={{ gap: 'var(--margin-medium)' }}
        >
          <Link
            href="/settings"
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
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--theme-blue)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Start Deploying
          </Link>
          <Link
            href="/docs"
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
            Read the Docs
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

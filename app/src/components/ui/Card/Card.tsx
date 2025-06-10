"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  const cardRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    );
  }, []);
  return (
    <div
      ref={cardRef}
      className={`bg-[var(--card-background)] rounded-lg shadow-lg p-6 transition-all ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

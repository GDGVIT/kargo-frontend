"use client";

import React, { ElementType } from "react";
import { motion } from "framer-motion";

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  as?: ElementType;
  children?: React.ReactNode;
  icon?: React.ReactElement<{ style?: React.CSSProperties }> | React.ReactNode;
}

const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  subtitle,
  className = "",
  as: Heading = "h1",
  children,
  icon,
}) => {
  const HeadingTag = Heading as ElementType;

  return (
    <motion.div
      className={`mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2 ${className}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div
        className="flex items-center gap-2"
        style={{
          fontSize: "1.875rem",
          lineHeight: 1.2,
          alignItems: "flex-start",
        }}
      >
        {icon && (
          <motion.span
            className="mr-2 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            style={{
              display: "flex",
              alignItems: "center",
              height: "2.25rem",
              marginTop: 0,
            }}
          >
            {React.isValidElement<{ style?: React.CSSProperties }>(icon)
              ? React.cloneElement(icon, {
                  style: {
                    ...((icon.props?.style as React.CSSProperties) || {}),
                    fontSize: "1.6rem",
                    height: "1em",
                    width: "1em",
                    verticalAlign: "middle",
                    marginTop: "0px",
                  },
                })
              : icon}
          </motion.span>
        )}
        <div>
          <HeadingTag
            className="text-2xl sm:text-3xl font-bold text-gray-100 tracking-tight mb-1"
            style={{ margin: 0 }}
          >
            {title}
          </HeadingTag>
          {subtitle && (
            <motion.div
              className="text-base text-zinc-400 font-normal mt-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            >
              {subtitle}
            </motion.div>
          )}
        </div>
      </div>

      {children && (
        <motion.div
          className="mt-2 sm:mt-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PageHeading;

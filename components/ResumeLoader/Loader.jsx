"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../../public/logo.png";

/**
 * FullPageLoader
 * Props:
 *  - isLoading: boolean
 *  - mode: "builder" | "scanner" | "comparing"  (defaults to "scanner")
 *
 * A clean, theme-consistent loader with blue/white design
 * showing animated logo, bouncing dots, and step messages.
 */
export default function FullPageLoader({
  isLoading = false,
  mode = "builder",
}) {
  const [stepIndex, setStepIndex] = useState(0);

  const configs = {
    builder: {
      steps: [
        "Building Resume...",
        "Applying Templates...",
        "Finalizing your resume...",
      ],
    },
    scanner: {
      steps: [
        "Analyzing Resume...",
        "Scanning Job Description...",
        "Matching Skills...",
        "Generating Results...",
      ],
    },
    comparing: {
      steps: [
        "Comparing Resume with previous one...",
        "Calculating Match Score...",
        "Generating comparison...",
      ],
    },
  };

  const { steps } = configs[mode] || configs.scanner;

  useEffect(() => {
    if (!isLoading) {
      setStepIndex(0);
      return;
    }

    if (!steps || steps.length === 0) return;
    const t = setInterval(() => {
      setStepIndex((s) => (s + 1) % steps.length);
    }, 2000);

    return () => clearInterval(t);
  }, [isLoading, steps]);

  if (!isLoading) return null;

  const dotVariants = {
    bounce: {
      y: [0, -6, 0],
      transition: { repeat: Infinity, duration: 0.8 },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm text-center text-white">
        {/* Logo with pulse animation */}
        <motion.img
          src={logo.src} // replace with your company logo path
          alt="Company Logo"
          className=" h-20 mx-auto mb-6"
          initial={{ opacity: 0.8, scale: 0.9 }}
          animate={{ opacity: [0.8, 1, 0.8], scale: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        {/* Animated dots */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <motion.span
            variants={dotVariants}
            animate="bounce"
            className="bg-white w-3 h-3 rounded-full"
          />
          <motion.span
            variants={dotVariants}
            animate="bounce"
            transition={{ delay: 0.12 }}
            className="bg-white w-3 h-3 rounded-full"
          />
          <motion.span
            variants={dotVariants}
            animate="bounce"
            transition={{ delay: 0.24 }}
            className="bg-white w-3 h-3 rounded-full"
          />
        </div>

        {/* Step text */}
        <motion.p
          key={stepIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-lg font-semibold"
        >
          {steps && steps.length > 0 ? steps[stepIndex] : "Please wait..."}
        </motion.p>

        <p className="mt-2 text-sm text-white/80">
          This may take a few seconds...
        </p>
      </div>
    </div>
  );
}
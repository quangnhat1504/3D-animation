"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface ParallaxTextProps {
  scrollYProgress: MotionValue<number>;
  text: string;
  subtext?: string;
  startRange: number;
  endRange: number;
  yOffsetStart?: number;
  yOffsetEnd?: number;
  alignment?: "left" | "right" | "center" | "bottom-center";
  fontWeight?: "bold" | "thin";
}

export default function ParallaxText({ 
  scrollYProgress, 
  text, 
  subtext,
  startRange, 
  endRange,
  yOffsetStart = 100,
  yOffsetEnd = -100,
  alignment = "center",
  fontWeight = "bold"
}: ParallaxTextProps) {
  
  // Fade in at startRange, fade out at endRange, fully visible in the middle 60%
  const fadeInStart = startRange;
  const fadeInEnd = startRange + (endRange - startRange) * 0.2;
  const fadeOutStart = startRange + (endRange - startRange) * 0.8;
  const fadeOutEnd = endRange;

  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [startRange, endRange],
    [yOffsetStart, yOffsetEnd]
  );

  let alignmentClasses = "items-center justify-center text-center px-4";
  if (alignment === "left") {
    alignmentClasses = "items-start justify-center text-left pl-[10%] pr-[40%]";
  } else if (alignment === "right") {
    alignmentClasses = "items-end justify-center text-right pr-[10%] pl-[40%]";
  } else if (alignment === "bottom-center") {
    alignmentClasses = "items-center justify-end text-center pb-32 px-4";
  }

  const titleWeightClass = fontWeight === "thin" ? "font-light" : "font-bold";
  const subWeightClass = fontWeight === "thin" ? "font-extralight" : "font-light";

  return (
    <motion.div 
      className={`absolute inset-0 flex flex-col pointer-events-none z-20 ${alignmentClasses}`}
      style={{ opacity, y }}
    >
      <h2 className={`text-5xl md:text-7xl tracking-tighter text-[var(--color-on-primary)] drop-shadow-2xl ${titleWeightClass}`}>
        {text}
      </h2>
      {subtext && (
        <p className={`mt-4 text-xl md:text-2xl tracking-wide text-[var(--color-on-primary)]/70 max-w-lg drop-shadow-xl ${subWeightClass}`}>
          {subtext}
        </p>
      )}
    </motion.div>
  );
}

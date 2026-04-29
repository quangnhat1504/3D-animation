"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface EffectProps {
  scrollYProgress: MotionValue<number>;
  startRange: number;
  endRange: number;
}

// Chặng 1: The Core of Silence
export function ANCSoundWaves({ scrollYProgress, startRange, endRange }: EffectProps) {
  // Fade in at start, fade out at end
  const opacity = useTransform(
    scrollYProgress,
    [startRange, startRange + 0.05, endRange - 0.05, endRange],
    [0, 1, 1, 0]
  );

  // Shrink inwards as scroll progresses to simulate noise cancellation
  const scale1 = useTransform(scrollYProgress, [startRange, endRange], [2, 0.5]);
  const scale2 = useTransform(scrollYProgress, [startRange, endRange], [2.5, 0.8]);
  const scale3 = useTransform(scrollYProgress, [startRange, endRange], [3, 1.1]);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      style={{ opacity }}
    >
      <motion.div className="absolute w-[30vh] h-[30vh] rounded-full border-2 border-white/30" style={{ scale: scale1 }} />
      <motion.div className="absolute w-[30vh] h-[30vh] rounded-full border-2 border-white/20" style={{ scale: scale2 }} />
      <motion.div className="absolute w-[30vh] h-[30vh] rounded-full border border-white/10" style={{ scale: scale3 }} />
    </motion.div>
  );
}

// Chặng 2: Acoustic Precision (Leader Lines)
export function LeaderLines({ scrollYProgress, startRange, endRange }: EffectProps) {
  const opacity = useTransform(
    scrollYProgress,
    [startRange, startRange + 0.05, endRange - 0.05, endRange],
    [0, 1, 1, 0]
  );

  // Draw the lines dynamically
  const pathLength = useTransform(
    scrollYProgress,
    [startRange + 0.05, startRange + 0.15],
    [0, 1]
  );

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      style={{ opacity }}
    >
      {/* SVG Container covering the screen */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path 
          d="M 60 50 L 80 50 L 85 40" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.5)" 
          strokeWidth="0.2"
          style={{ pathLength }}
        />
        <motion.circle 
          cx="60" cy="50" r="0.5" fill="white"
          style={{ scale: pathLength }}
        />
        
        <motion.path 
          d="M 62 60 L 75 60 L 80 65" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.5)" 
          strokeWidth="0.2"
          style={{ pathLength }}
        />
        <motion.circle 
          cx="62" cy="60" r="0.5" fill="white"
          style={{ scale: pathLength }}
        />
      </svg>
    </motion.div>
  );
}

// Chặng 3: Tactile Luxury (Rim Light Sweep)
export function RimLightSweep({ scrollYProgress, startRange, endRange }: EffectProps) {
  const opacity = useTransform(
    scrollYProgress,
    [startRange, startRange + 0.05, endRange - 0.05, endRange],
    [0, 0.8, 0.8, 0]
  );

  // Sweep the light from left to right
  const x = useTransform(scrollYProgress, [startRange, endRange], ["-100%", "100%"]);

  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-overlay"
      style={{ opacity }}
    >
      <motion.div 
        className="w-[50%] h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 opacity-50"
        style={{ x }}
      />
    </motion.div>
  );
}

// Chặng 4: Seamless Logic (AI Pulse Ring)
export function AIPulseRing({ scrollYProgress, startRange }: EffectProps) {
  // Explode outwards
  const scale = useTransform(scrollYProgress, [startRange, startRange + 0.1], [0, 15]);
  
  // Fade out quickly after expanding
  const opacity = useTransform(
    scrollYProgress,
    [startRange, startRange + 0.08, startRange + 0.15],
    [0, 1, 0]
  );

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
    >
      <motion.div 
        className="absolute w-[20vh] h-[20vh] rounded-full border-[4px] border-[#0ea5e9]" // A subtle blue tint for Bluetooth/AI
        style={{ scale, opacity }}
      />
    </motion.div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center bg-[var(--color-background)] overflow-hidden">
      <div className="z-10 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-[var(--color-on-primary)]"
        >
          SonicWave Pro
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-xl md:text-2xl text-[var(--color-on-primary)]/70 max-w-2xl mx-auto font-light"
        >
          The culmination of acoustic engineering. Prepare for an immersive journey into sound.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center"
      >
        <span className="text-sm tracking-widest uppercase text-[var(--color-on-primary)]/50 mb-2">Scroll to Explore</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-on-primary)]/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-primary)] text-[var(--color-on-primary)] py-20 px-8 border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">SonicWave Pro</h2>
          <p className="text-[var(--color-on-primary)]/60 font-light max-w-sm">
            Experience the next generation of high-fidelity audio engineering.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 bg-[var(--color-accent)] text-[var(--color-primary)] font-semibold rounded-full hover:opacity-90 transition-opacity">
            Pre-order Now
          </button>
          <button className="px-8 py-4 border border-[var(--color-border)] text-[var(--color-on-primary)] font-semibold rounded-full hover:bg-[var(--color-secondary)] transition-colors">
            View Specs
          </button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[var(--color-border)]/50 flex flex-col md:flex-row items-center justify-between text-sm text-[var(--color-on-primary)]/40">
        <p>&copy; 2026 SonicWave Audio Inc. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-[var(--color-on-primary)] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[var(--color-on-primary)] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Dumbbell, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#090b0e] border-t border-[#1a202c] py-10 sm:py-14 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#141822] border border-[#222a3a] flex items-center justify-center">
              <Image
                src="/assets/logo.png"
                alt="FitLog Logo"
                width={18}
                height={18}
                className="object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <Dumbbell className="w-4 h-4 text-accent" style={{ display: "none" }} />
            </div>
            <span className="font-display text-xl font-bold tracking-wider text-white">
              FIT<span className="text-accent">LOG</span>
            </span>
          </div>

          {/* Center / Navigation Links */}
          <div className="flex items-center gap-6 text-xs sm:text-sm font-medium">
            <Link href="/" className="hover:text-accent transition-colors">
              Workout Library
            </Link>
            <Link href="/my-plan" className="hover:text-accent transition-colors">
              My Plan
            </Link>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-gray-500 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Copyright Notice */}
          <p className="text-xs text-gray-500 text-center md:text-right">
            &copy; 2026 FitLog &mdash; Workout Library. Train hard, log honest.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useWorkout } from "../context/WorkoutContext";
import { Dumbbell, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isWorkoutActive = pathname === "/";
  const isPlanActive = pathname === "/my-plan";

  return (
    <nav className="sticky top-0 z-50 bg-[#0c0e12]/95 backdrop-blur-md border-b border-[#1f2633]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-[#19202c] border border-[#2a3447] group-hover:border-accent transition-colors">
              <Image
                src="/assets/logo.png"
                alt="FitLog Logo"
                width={20}
                height={20}
                className="object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <Dumbbell className="w-4 h-4 text-accent absolute" style={{ display: "none" }} />
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-white">
              FIT<span className="text-accent">LOG</span>
            </span>
          </Link>

          {/* Middle: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#131720] px-2 py-1.5 rounded-full border border-[#202736]">
            <Link
              href="/"
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                isWorkoutActive
                  ? "bg-[#202736] text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Workout
            </Link>
            <Link
              href="/my-plan"
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                isPlanActive
                  ? "bg-[#202736] text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </div>

          {/* Right: Badge Counters */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Plan Badge (Filled Accent Pill) */}
            <Link
              href="/my-plan"
              className="bg-accent hover:bg-accent-hover text-black px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Plan</span>
              <span className="bg-black text-white text-[11px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center font-mono font-bold">
                {plan.length}
              </span>
            </Link>

            {/* Saved Badge (Outline Pill) */}
            <Link
              href="/my-plan"
              className="border border-[#2a3447] hover:border-accent text-gray-300 hover:text-white px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 bg-[#131720]"
            >
              <span>Saved</span>
              <span className="bg-[#202736] text-gray-200 text-[11px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center font-mono font-bold">
                {saved.length}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <Link
              href="/my-plan"
              className="bg-accent text-black px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1"
            >
              <span>Plan</span>
              <span className="bg-black text-white text-[10px] px-1.5 py-0.2 rounded-full">
                {plan.length}
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#131720] border border-[#202736] text-gray-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden py-4 border-t border-[#1f2633] space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                isWorkoutActive
                  ? "bg-accent text-black font-semibold"
                  : "text-gray-300 hover:bg-[#19202c]"
              }`}
            >
              Workout
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                isPlanActive
                  ? "bg-accent text-black font-semibold"
                  : "text-gray-300 hover:bg-[#19202c]"
              }`}
            >
              My Plan
            </Link>
            <div className="flex items-center gap-2 pt-2 px-2">
              <Link
                href="/my-plan"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center border border-[#2a3447] text-gray-300 px-3 py-2 rounded-lg text-xs font-semibold bg-[#131720]"
              >
                Saved ({saved.length})
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

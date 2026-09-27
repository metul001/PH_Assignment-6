"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Flame, Sparkles } from "lucide-react";

export default function Hero() {
  const scrollToLibrary = (e) => {
    e.preventDefault();
    const element = document.getElementById("library");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 border-b border-[#1b212d]">
      {/* Background subtle glow effect */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161c26] border border-[#263143] text-accent text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WORKOUT LIBRARY</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.1]">
              TRAIN WITH INTENT.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#99cc00]">
                LOG EVERY SET.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#library"
                onClick={scrollToLibrary}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-hover text-black px-7 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-accent/10 hover:shadow-accent/20 cursor-pointer"
              >
                <span>BROWSE WORKOUTS</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>12 Major Muscle Lifts Available</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-[#202838] bg-[#121620] shadow-2xl group">
              <div className="relative h-72 sm:h-80 md:h-96 w-full">
                <Image
                  src="/assets/banner.png"
                  alt="FitLog Gym Workout Banner"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent opacity-80" />
              </div>

              {/* Small floating stat badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#141923]/90 backdrop-blur-md border border-[#252f41] p-3 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-gray-400 uppercase font-semibold">Today&apos;s Focus</p>
                  <p className="text-xs font-bold text-white">Full Body Conditioning</p>
                </div>
                <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-2 py-1 rounded">
                  5 Lifts Cap
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWorkout } from "../../context/WorkoutContext";
import PlanCard from "../../components/PlanCard";
import {
  Dumbbell,
  Clock,
  Flame,
  Bookmark,
  PlusCircle,
  CheckCircle,
  Inbox,
  ArrowRight,
} from "lucide-react";

export default function MyPlanPage() {
  const { plan, saved } = useWorkout();
  const [activeTab, setActiveTab] = useState("plan");

  // Calculate live metrics using array reduce
  const totalExercises = plan.length;
  const totalMinutes = plan.reduce(
    (total, item) => total + (Number(item.duration) || 0),
    0
  );
  const totalCalories = plan.reduce(
    (total, item) => total + (Number(item.caloriesBurned) || 0),
    0
  );

  const completedCount = plan.filter((item) => item.done).length;

  return (
    <div className="py-10 sm:py-16 bg-[#0c0e12] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161c26] border border-[#263143] text-accent text-xs font-semibold tracking-widest uppercase">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>DAILY LOG</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            MY PLAN
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Metric 1: Exercises */}
          <div className="bg-[#121620] border border-[#202838] rounded-2xl p-5 sm:p-6 relative overflow-hidden group hover:border-accent/40 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Exercises
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                    {totalExercises}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">/ 5 max</span>
                </div>
                {completedCount > 0 && (
                  <p className="text-[11px] text-emerald-400 font-medium mt-1">
                    {completedCount} completed
                  </p>
                )}
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#18202c] border border-[#263246] flex items-center justify-center text-accent">
                <Dumbbell className="w-6 h-6" />
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-[#1b2230] h-1.5 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-accent h-full transition-all duration-300"
                style={{ width: `${(totalExercises / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Metric 2: Minutes */}
          <div className="bg-[#121620] border border-[#202838] rounded-2xl p-5 sm:p-6 relative overflow-hidden group hover:border-accent/40 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Minutes
                </p>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                    {totalMinutes}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">min</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Estimated session time</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#18202c] border border-[#263246] flex items-center justify-center text-accent">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full bg-[#1b2230] h-1.5 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-accent h-full transition-all duration-300"
                style={{ width: `${Math.min((totalMinutes / 120) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Metric 3: Calories */}
          <div className="bg-[#121620] border border-[#202838] rounded-2xl p-5 sm:p-6 relative overflow-hidden group hover:border-accent/40 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Calories
                </p>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                    {totalCalories}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">kcal</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Estimated energy burn</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#18202c] border border-[#263246] flex items-center justify-center text-orange-400">
                <Flame className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full bg-[#1b2230] h-1.5 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-orange-400 h-full transition-all duration-300"
                style={{ width: `${Math.min((totalCalories / 800) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabs: Today's Plan / Saved */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#1f2636] pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("plan")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "plan"
                    ? "bg-accent text-black shadow-md shadow-accent/10"
                    : "bg-[#131720] text-gray-400 hover:text-white border border-[#202838]"
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Today&apos;s Plan</span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    activeTab === "plan" ? "bg-black text-white" : "bg-[#202838] text-gray-300"
                  }`}
                >
                  {plan.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("saved")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "saved"
                    ? "bg-accent text-black shadow-md shadow-accent/10"
                    : "bg-[#131720] text-gray-400 hover:text-white border border-[#202838]"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>Saved for Later</span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    activeTab === "saved" ? "bg-black text-white" : "bg-[#202838] text-gray-300"
                  }`}
                >
                  {saved.length}
                </span>
              </button>
            </div>

            {/* Quick Link to Add More */}
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Browse More Lifts</span>
            </Link>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "plan" && (
              <>
                {plan.length === 0 ? (
                  /* Empty State */
                  <div className="py-20 text-center space-y-4 bg-[#121620] border border-[#202838] rounded-2xl p-8 max-w-xl mx-auto">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-[#181f2c] border border-[#263143] text-accent flex items-center justify-center">
                      <Inbox className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-display text-2xl font-bold uppercase text-white">
                        NOTHING HERE YET
                      </h3>
                      <p className="text-sm text-gray-400">
                        Browse the library and add a lift to get today moving.
                      </p>
                    </div>
                    <div className="pt-3">
                      <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-black px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-accent/10"
                      >
                        <span>Go to workouts</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {plan.map((workout) => (
                      <PlanCard key={workout.id} workout={workout} type="plan" />
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === "saved" && (
              <>
                {saved.length === 0 ? (
                  /* Empty State for Saved */
                  <div className="py-20 text-center space-y-4 bg-[#121620] border border-[#202838] rounded-2xl p-8 max-w-xl mx-auto">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-[#181f2c] border border-[#263143] text-accent flex items-center justify-center">
                      <Bookmark className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-display text-2xl font-bold uppercase text-white">
                        NO SAVED WORKOUTS
                      </h3>
                      <p className="text-sm text-gray-400">
                        You have not bookmarked any exercises yet. Save lifts from the library for future workouts.
                      </p>
                    </div>
                    <div className="pt-3">
                      <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-black px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-accent/10"
                      >
                        <span>Explore Library</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {saved.map((workout) => (
                      <PlanCard key={workout.id} workout={workout} type="saved" />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useWorkout } from "../../../context/WorkoutContext";
import {
  ArrowLeft,
  Clock,
  Flame,
  Star,
  Dumbbell,
  Layers,
  Activity,
  Plus,
  Bookmark,
  CheckCircle2,
  Loader2,
  ListOrdered,
  AlertCircle,
} from "lucide-react";

export default function WorkoutDetailPage() {
  const params = useParams();
  const id = params?.id;

  const { plan, saved, addToPlan, addToSaved } = useWorkout();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchWorkoutDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        // Primary API
        let res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        if (!res.ok) {
          // Fallback to Alternative API
          res = await fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`);
        }
        const data = await res.json();
        setWorkout(data);
      } catch (err) {
        console.error("Error fetching single workout:", err);
        try {
          const fallbackRes = await fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`);
          const fallbackData = await fallbackRes.json();
          setWorkout(fallbackData);
        } catch (fallbackErr) {
          setError("Could not load workout details. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4">
        <div className="w-12 h-12 rounded-full bg-[#161c28] border border-[#263143] text-accent flex items-center justify-center animate-spin">
          <Loader2 className="w-6 h-6" />
        </div>
        <p className="text-gray-300 font-medium text-sm sm:text-base">
          Loading workout details...
        </p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="min-h-[60vh] max-w-lg mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="font-display text-2xl font-bold uppercase text-white">Workout Not Found</h2>
        <p className="text-sm text-gray-400">
          {error || "The requested workout could not be retrieved from the catalog."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#19202c] hover:bg-[#222a3a] border border-[#2c374d] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>
    );
  }

  const isAlreadyInPlan = plan.some((item) => item.id === workout.id);
  const isAlreadySaved = saved.some((item) => item.id === workout.id);

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-[#0c0e12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-400 hover:text-accent transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Library</span>
          </Link>
        </div>

        {/* Main Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Large Image */}
          <div className="lg:col-span-5">
            <div className="relative w-full h-80 sm:h-96 lg:h-[480px] rounded-2xl overflow-hidden border border-[#202838] bg-[#121620] shadow-xl">
              {workout.image ? (
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <Dumbbell className="w-20 h-20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12]/80 via-transparent to-transparent opacity-60" />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {workout.muscleGroups?.map((group, idx) => (
                  <span
                    key={idx}
                    className="bg-[#0c0e12]/90 backdrop-blur-md text-accent border border-accent/40 text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Information & Specs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Title & Description */}
            <div className="space-y-3">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
                {workout.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                {workout.description}
              </p>
            </div>

            {/* Key Specs Table / Panel */}
            <div className="bg-[#121620] border border-[#202838] rounded-2xl p-5 sm:p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>KEY SPECIFICATIONS</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="bg-[#161c28] border border-[#222b3d] p-3 rounded-xl">
                  <span className="text-[11px] text-gray-400 uppercase font-semibold block mb-0.5">
                    Equipment
                  </span>
                  <span className="text-white font-medium flex items-center gap-1.5 truncate">
                    <Dumbbell className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span className="truncate">{workout.equipment || "Bodyweight"}</span>
                  </span>
                </div>

                <div className="bg-[#161c28] border border-[#222b3d] p-3 rounded-xl">
                  <span className="text-[11px] text-gray-400 uppercase font-semibold block mb-0.5">
                    Difficulty
                  </span>
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{workout.difficulty || "Intermediate"}</span>
                  </span>
                </div>

                <div className="bg-[#161c28] border border-[#222b3d] p-3 rounded-xl">
                  <span className="text-[11px] text-gray-400 uppercase font-semibold block mb-0.5">
                    Sets & Reps
                  </span>
                  <span className="text-white font-mono font-bold">
                    {workout.sets} sets &times; {workout.reps}
                  </span>
                </div>

                <div className="bg-[#161c28] border border-[#222b3d] p-3 rounded-xl">
                  <span className="text-[11px] text-gray-400 uppercase font-semibold block mb-0.5">
                    Duration
                  </span>
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{workout.duration} min</span>
                  </span>
                </div>

                <div className="bg-[#161c28] border border-[#222b3d] p-3 rounded-xl">
                  <span className="text-[11px] text-gray-400 uppercase font-semibold block mb-0.5">
                    Calories Burned
                  </span>
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>{workout.caloriesBurned} kcal</span>
                  </span>
                </div>

                <div className="bg-[#161c28] border border-[#222b3d] p-3 rounded-xl">
                  <span className="text-[11px] text-gray-400 uppercase font-semibold block mb-0.5">
                    Rating
                  </span>
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
                    <span>{workout.rating} / 5.0</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions Section */}
            {workout.instructions && workout.instructions.length > 0 && (
              <div className="bg-[#121620] border border-[#202838] rounded-2xl p-5 sm:p-6 space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                  <ListOrdered className="w-4 h-4" />
                  <span>INSTRUCTIONS</span>
                </h2>

                <ol className="space-y-3">
                  {workout.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="w-6 h-6 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => addToPlan(workout)}
                className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg ${
                  isAlreadyInPlan
                    ? "bg-[#182015] border border-emerald-500/40 text-emerald-400 hover:bg-[#1f2c1b]"
                    : "bg-accent hover:bg-accent-hover text-black shadow-accent/10 hover:shadow-accent/20"
                }`}
              >
                {isAlreadyInPlan ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>In Today&apos;s Plan</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to today&apos;s plan</span>
                  </>
                )}
              </button>

              <button
                onClick={() => addToSaved(workout)}
                className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all border ${
                  isAlreadySaved
                    ? "bg-[#181d28] border-accent/50 text-accent"
                    : "bg-[#141822] hover:bg-[#1a202c] border-[#252f41] text-gray-200 hover:text-white"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isAlreadySaved ? "Saved in Bookmarks" : "Save for later"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

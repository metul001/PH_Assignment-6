"use client";

import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard";
import { Dumbbell, ArrowUpDown, Search, Loader2, RefreshCw } from "lucide-react";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Challenge requirement: Sorting
  const [sortBy, setSortBy] = useState("duration");

  // Optional requirement: Search filter
  const [searchQuery, setSearchQuery] = useState("");

  const fetchWorkouts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Primary API
      let res = await fetch("https://api.abcz.workers.dev/api/fitlog");
      if (!res.ok) {
        // Fallback to Alternative API
        res = await fetch("https://api.api-store.workers.dev/api/fitlog");
      }
      const data = await res.json();
      setWorkouts(data);
    } catch (err) {
      console.error("Error fetching workouts:", err);
      // Try fallback API if primary failed with network error
      try {
        const fallbackRes = await fetch("https://api.api-store.workers.dev/api/fitlog");
        const fallbackData = await fallbackRes.json();
        setWorkouts(fallbackData);
      } catch (fallbackErr) {
        setError("Failed to load workout library. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Filter workouts by search query (name or muscle group)
  const filteredWorkouts = workouts.filter((workout) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const matchesName = workout.name?.toLowerCase().includes(query);
    const matchesTag = workout.muscleGroups?.some((group) =>
      group.toLowerCase().includes(query)
    );
    const matchesEquipment = workout.equipment?.toLowerCase().includes(query);

    return matchesName || matchesTag || matchesEquipment;
  });

  // Sort filtered workouts based on selected criteria
  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }
    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <section id="library" className="py-16 md:py-24 bg-[#0c0e12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1c2230]">
          <div>
            <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-1.5">
              <Dumbbell className="w-4 h-4" />
              <span>CATALOG</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              THE LIBRARY
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-1">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Controls: Search & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Optional Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lifts or muscles..."
                className="w-full sm:w-56 bg-[#131720] border border-[#232a3a] focus:border-accent text-sm text-white placeholder-gray-500 pl-9 pr-3 py-2 rounded-xl outline-none transition-all"
              />
            </div>

            {/* Challenge 1: Sort Dropdown */}
            <div className="flex items-center gap-2 bg-[#131720] border border-[#232a3a] px-3 py-2 rounded-xl text-sm">
              <ArrowUpDown className="w-4 h-4 text-accent shrink-0" />
              <span className="text-xs text-gray-400 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white font-semibold text-xs sm:text-sm outline-none cursor-pointer"
              >
                <option value="duration" className="bg-[#131720] text-white">
                  Duration (Low to High)
                </option>
                <option value="calories" className="bg-[#131720] text-white">
                  Calories (High to Low)
                </option>
                <option value="rating" className="bg-[#131720] text-white">
                  Rating (Top Rated)
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Content State: Loading, Error, or Grid */}
        <div className="pt-10">
          {loading ? (
            <div className="py-24 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#161c28] border border-[#263143] text-accent animate-spin">
                <Loader2 className="w-6 h-6" />
              </div>
              <p className="text-gray-300 font-medium text-base">Loading workouts...</p>
              <p className="text-xs text-gray-500">Fetching the latest lifts from FitLog database</p>
            </div>
          ) : error ? (
            <div className="py-16 text-center space-y-4 bg-[#141822] border border-[#222a3a] rounded-2xl p-8 max-w-lg mx-auto">
              <p className="text-red-400 font-medium">{error}</p>
              <button
                onClick={fetchWorkouts}
                className="inline-flex items-center gap-2 bg-accent text-black px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase hover:bg-accent-hover transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry</span>
              </button>
            </div>
          ) : sortedWorkouts.length === 0 ? (
            <div className="py-20 text-center space-y-3 bg-[#121620] border border-[#202838] rounded-2xl p-8">
              <p className="font-display text-xl font-bold uppercase text-white">
                No Workouts Found
              </p>
              <p className="text-sm text-gray-400">
                No lifts match your search &quot;{searchQuery}&quot;. Try another term.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-accent underline font-semibold mt-2"
              >
                Clear search filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {sortedWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

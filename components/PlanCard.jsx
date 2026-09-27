"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Dumbbell, CheckCircle2, Circle, X, ExternalLink, Plus } from "lucide-react";
import { useWorkout } from "../context/WorkoutContext";

export default function PlanCard({ workout, type = "plan" }) {
  const { removeFromPlan, removeFromSaved, markAsDone, addToPlan } = useWorkout();
  const { id, name, image, equipment, duration, caloriesBurned, rating, done } = workout;

  const isPlan = type === "plan";

  return (
    <div
      className={`group bg-[#121620] border rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 ${
        isPlan && done
          ? "border-emerald-500/40 bg-[#0f1715]/80 shadow-lg shadow-emerald-950/20"
          : "border-[#202838] hover:border-[#2f3b52]"
      }`}
    >
      {/* Left: Thumbnail & Main Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#181e2b] shrink-0 border border-[#232c3d]">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="96px"
              className={`object-cover object-center transition-all ${
                isPlan && done ? "grayscale contrast-125 opacity-70" : ""
              }`}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <Dumbbell className="w-8 h-8" />
            </div>
          )}
          {isPlan && done && (
            <div className="absolute inset-0 bg-emerald-950/50 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 drop-shadow" />
            </div>
          )}
        </div>

        {/* Text Info */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2">
            <h3
              className={`font-display text-base sm:text-lg font-bold uppercase tracking-wide truncate ${
                isPlan && done ? "line-through text-gray-400" : "text-white"
              }`}
            >
              {name}
            </h3>
            {isPlan && done && (
              <span className="shrink-0 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                DONE
              </span>
            )}
          </div>

          <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium truncate">
            <Dumbbell className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            <span>{equipment}</span>
          </p>

          {/* Stats Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300 pt-1 font-mono">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-accent" />
              <span>{duration} min</span>
            </span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-400" />
              <span>{caloriesBurned} kcal</span>
            </span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span>{rating}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#1c2331]">
        {/* View Details Button */}
        <Link
          href={`/workout/${id}`}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#181f2c] hover:bg-[#20293a] border border-[#273247] text-xs font-semibold text-gray-200 hover:text-white transition-all"
        >
          <span>View Details</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Mark as Done Button (For Plan Items) */}
        {isPlan && (
          <button
            onClick={() => markAsDone(id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              done
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                : "bg-[#181f2c] hover:bg-[#222c3d] text-gray-300 hover:text-accent border border-[#273247]"
            }`}
          >
            {done ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-3.5 h-3.5" />
                <span>Mark as Done</span>
              </>
            )}
          </button>
        )}

        {/* Add to Plan Button (For Saved Items) */}
        {!isPlan && (
          <button
            onClick={() => addToPlan(workout)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent hover:bg-accent-hover text-black text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Plan</span>
          </button>
        )}

        {/* Remove Button */}
        <button
          onClick={() => (isPlan ? removeFromPlan(id) : removeFromSaved(id))}
          className="p-2 rounded-xl bg-[#181f2c] hover:bg-red-500/20 border border-[#273247] hover:border-red-500/40 text-gray-400 hover:text-red-400 transition-all"
          title="Remove item"
          aria-label="Remove item"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

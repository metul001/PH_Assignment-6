"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Dumbbell, ChevronRight } from "lucide-react";

export default function WorkoutCard({ workout }) {
  const { id, name, image, muscleGroups, equipment, duration, caloriesBurned, rating } = workout;

  return (
    <Link
      href={`/workout/${id}`}
      className="group bg-[#121620] hover:bg-[#161c28] border border-[#202838] hover:border-accent/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
    >
      {/* Workout Image & Tag Badges */}
      <div className="relative h-48 sm:h-52 w-full bg-[#181e2b] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <Dumbbell className="w-12 h-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-transparent to-transparent opacity-90" />

        {/* Category Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {muscleGroups &&
            muscleGroups.map((tag, index) => (
              <span
                key={index}
                className="bg-[#0c0e12]/85 backdrop-blur-md text-accent border border-accent/30 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-white group-hover:text-accent transition-colors line-clamp-1">
            {name}
          </h3>

          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5 font-medium line-clamp-1">
            <Dumbbell className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            <span>{equipment}</span>
          </p>
        </div>

        {/* Stats Row */}
        <div className="pt-3 border-t border-[#1e2636] flex items-center justify-between text-xs text-gray-300">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>{duration} min</span>
          </div>

          <div className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span>{caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
            <span className="font-semibold text-white">{rating}</span>
          </div>
        </div>

        {/* View Details Prompt */}
        <div className="flex items-center justify-between text-xs font-semibold text-accent/80 group-hover:text-accent pt-1">
          <span>View Details</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

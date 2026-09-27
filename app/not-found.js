import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#0c0e12]">
      <div className="max-w-md w-full text-center space-y-6 bg-[#121620] border border-[#202838] p-8 sm:p-10 rounded-2xl shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#18202c] border border-[#263143] text-accent flex items-center justify-center">
          <Dumbbell className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            ERROR 404
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight pt-2">
            PAGE NOT FOUND
          </h1>
          <p className="text-sm text-gray-400">
            The page you are looking for does not exist, was removed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-black px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-accent/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

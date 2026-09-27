import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 bg-[#0c0e12]">
      <div className="w-12 h-12 rounded-full bg-[#161c28] border border-[#263143] text-accent flex items-center justify-center animate-spin">
        <Loader2 className="w-6 h-6" />
      </div>
      <p className="text-gray-300 font-medium text-sm">Loading FitLog...</p>
    </div>
  );
}

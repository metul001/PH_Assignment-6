import Hero from "../components/Hero";
import WorkoutLibrary from "../components/WorkoutLibrary";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-full">
      <Hero />
      <WorkoutLibrary />
    </div>
  );
}

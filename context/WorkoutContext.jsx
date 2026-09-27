"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load plan and saved workouts from localStorage when app starts
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }
      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save plan workouts to localStorage whenever plan changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("fitlog_plan", JSON.stringify(plan));
      } catch (error) {
        console.error("Failed to save plan to localStorage", error);
      }
    }
  }, [plan, isLoaded]);

  // Save saved workouts to localStorage whenever saved changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("fitlog_saved", JSON.stringify(saved));
      } catch (error) {
        console.error("Failed to save saved list to localStorage", error);
      }
    }
  }, [saved, isLoaded]);

  // Add workout to Today's Plan
  const addToPlan = (workout) => {
    // Check if already in plan
    const isAlreadyInPlan = plan.some((item) => item.id === workout.id);
    if (isAlreadyInPlan) {
      toast.error("Already in today's plan!");
      return;
    }

    // Check 5 workout limit
    if (plan.length >= 5) {
      toast.error("Today's plan can contain maximum 5 workouts");
      return;
    }

    setPlan((prevPlan) => [...prevPlan, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  };

  // Add workout to Saved for Later
  const addToSaved = (workout) => {
    // Check if already saved
    const isAlreadySaved = saved.some((item) => item.id === workout.id);
    if (isAlreadySaved) {
      toast.error("Already saved for later!");
      return;
    }

    setSaved((prevSaved) => [...prevSaved, workout]);
    toast.success("Saved for later");
  };

  // Remove workout from Today's Plan
  const removeFromPlan = (id) => {
    setPlan((prevPlan) => prevPlan.filter((item) => item.id !== id));
    toast.success("Removed from plan");
  };

  // Remove workout from Saved
  const removeFromSaved = (id) => {
    setSaved((prevSaved) => prevSaved.filter((item) => item.id !== id));
    toast.success("Removed from saved");
  };

  // Toggle Mark as Done for a plan workout
  const markAsDone = (id) => {
    let nowDone = false;
    setPlan((prevPlan) =>
      prevPlan.map((item) => {
        if (item.id === id) {
          nowDone = !item.done;
          return { ...item, done: !item.done };
        }
        return item;
      })
    );

    if (nowDone) {
      toast.success("Marked as completed! 💪");
    } else {
      toast("Marked as incomplete", { icon: "↩️" });
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

// Custom hook for easier access to WorkoutContext
export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}

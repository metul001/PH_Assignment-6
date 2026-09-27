import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WorkoutProvider } from "../context/WorkoutContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FitLog — Workout Library & Gym Routine Tracker",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and track your daily sets, duration, and calories.",
  keywords: "gym, workout, fitness, tracker, lift, routine, fitlog",
  authors: [{ name: "FitLog Team" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0c0e12] text-gray-100 min-h-screen flex flex-col antialiased selection:bg-accent selection:text-black">
        <WorkoutProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#141822",
                color: "#f3f4f6",
                border: "1px solid #232c3d",
                fontSize: "13px",
                fontWeight: "500",
                borderRadius: "12px",
                padding: "12px 16px",
              },
              success: {
                iconTheme: {
                  primary: "#ccff00",
                  secondary: "#0c0e12",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#ffffff",
                },
              },
            }}
          />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}

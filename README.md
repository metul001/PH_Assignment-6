# 💪 FitLog — Workout Library & Routine Tracker

FitLog is a modern, dark-themed gym companion web application built with **Next.js (App Router)**, **React**, and **Tailwind CSS**. It allows fitness enthusiasts to explore a comprehensive library of major muscle-group lifts, view detailed exercise specifications and step-by-step instructions, curate a focused daily workout plan (capped at 5 lifts), bookmark exercises for later, and track daily session metrics in real time.

---

## 🚀 Live Demo & Repository

- **Live Deployment:** [https://ph-assignment-6-fit-log.vercel.app](https://ph-assignment-6-fit-log.vercel.app)
- **GitHub Repository:** [https://github.com/metul001/PH_Assignment-6.git](https://github.com/metul001/PH_Assignment-6.git)

---

## 🛠️ Technologies Used

- **Framework:** Next.js 14 (App Router)
- **Library:** React 18
- **Styling:** Tailwind CSS (Dark Gym Aesthetic)
- **State Management:** React Context API (`WorkoutContext`)
- **Data Persistence:** Browser `localStorage`
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Data Fetching:** REST API (`fetch`) with automatic fallback

---

## ✨ Key Features

1. **🏋️ Dynamic Workout Library & Live API Integration**
   - Fetches and displays major muscle lifts covering Chest, Back, Shoulders, Arms, Legs, and Core.
   - Includes real-time fallback API support to ensure high availability.

2. **⚡ Real-time Sorting & Search Filter (Challenge Requirement)**
   - Sort workouts dynamically by **Duration (min)**, **Calories Burned (kcal)**, or **Rating**.
   - Instant search filter by workout name, equipment, or muscle group.

3. **📋 Dynamic Workout Details Page (`/workout/[id]`)**
   - Detailed two-column layout showing exercise media, key specifications table (Difficulty, Equipment, Sets & Reps, Duration, Calories, Rating), and numbered step-by-step instructions.
   - One-click buttons to add directly to "Today's Plan" or "Save for later".

4. **📊 Daily Plan Management & Live Metrics Tracker (`/my-plan`)**
   - Automatically calculates total exercises, total minutes, and total calories burned using array `reduce()`.
   - Implements a 5-exercise daily focus limit with user alerts.
   - Dual-tab navigation for "Today's Plan" and "Saved for Later" with live item counters.

5. **✅ Interactive Mark as Done & Remove (Challenge Requirement)**
   - Toggle workout completion status with visual progress cues and celebratory toasts.
   - Seamlessly remove workouts from the plan with instant recalculation of metrics.

6. **💾 LocalStorage Persistence & Error Resilience**
   - Persists your daily plan and bookmarks across browser reloads.
   - Custom styled 404 Not Found page and smooth loading states.

---

## 💻 Local Setup & Installation

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/metul001/PH_Assignment-6.git
   cd PH_Assignment-6
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📁 Beginner-Friendly Project Structure

```text
├── app/
│   ├── globals.css         # Theme styles, custom scrollbar & fonts
│   ├── layout.js           # Root layout with WorkoutProvider & Toaster
│   ├── loading.js          # Global loading spinner
│   ├── not-found.js        # Custom 404 error page
│   ├── page.js             # Home page (Hero + WorkoutLibrary)
│   ├── my-plan/
│   │   └── page.js         # My Plan page with metrics & tabs
│   └── workout/
│       └── [id]/
│           └── page.js     # Dynamic workout details page
├── components/
│   ├── Navbar.jsx          # Sticky navbar with live badge counters
│   ├── Hero.jsx            # Hero section with banner & scroll CTA
│   ├── WorkoutLibrary.jsx  # Catalog section with search & sorting
│   ├── WorkoutCard.jsx     # Reusable workout card component
│   ├── PlanCard.jsx        # Plan/Saved card with actions
│   └── Footer.jsx          # Brand footer
├── context/
│   └── WorkoutContext.jsx  # Global Context API for Plan & Saved state
├── public/
│   └── assets/             # Images and brand assets
└── tailwind.config.js      # Custom dark theme configuration
```

---

## 👨‍💻 Author

- **Metul** — [GitHub Profile](https://github.com/metul001)
- Programming Hero — Milestone 6 (Assignment 6)
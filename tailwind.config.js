/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#ccff00",
          hover: "#b3e600",
          dark: "#1c2605",
        },
        dark: {
          900: "#0b0d12",
          800: "#12161f",
          700: "#19202c",
          600: "#222a3a",
          500: "#2f384c",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
};

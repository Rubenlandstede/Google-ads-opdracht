/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // Indigo
        good: "#22c55e",
        warning: "#facc15",
        bad: "#ef4444",
        neutral: "#94a3b8",
        background: "#f1f5ff",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.05)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

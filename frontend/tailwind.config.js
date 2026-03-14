/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        surface: "#020617",
        panel: "#020617",
        accent: "#38bdf8",
        accentSoft: "#0f172a"
      },
    },
  },
  plugins: [],
};


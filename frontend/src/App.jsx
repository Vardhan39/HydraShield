import React, { useState, useEffect } from "react";
import Landing from "./pages/Landing.jsx";
import ManualDashboard from "./pages/ManualDashboard.jsx";
import VideoDashboard from "./pages/VideoDashboard.jsx";
import { Moon, Sun } from "lucide-react";

export default function App() {
  const [mode, setMode] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const UIWrapper = ({ children }) => (
    <div className="min-h-screen relative">
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-lg hover:scale-110 active:scale-95 transition-all"
        title="Toggle Theme"
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      {children}
    </div>
  );

  if (mode === "manual") {
    return (
      <UIWrapper>
        <ManualDashboard onBack={() => setMode(null)} />
      </UIWrapper>
    );
  }

  if (mode === "video") {
    return (
      <UIWrapper>
        <VideoDashboard onBack={() => setMode(null)} />
      </UIWrapper>
    );
  }

  return (
    <UIWrapper>
      <Landing onSelectMode={setMode} />
    </UIWrapper>
  );
}


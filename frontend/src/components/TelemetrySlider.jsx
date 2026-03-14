import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TelemetrySlider({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
  step = 0.1,
  hint,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div 
      className="space-y-6 group relative pb-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-3 transition-colors duration-300 group-hover:text-indigo-500">
          <motion.span 
            className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"
            animate={{ 
              backgroundColor: isHovered ? "var(--accent)" : "rgba(148, 163, 184, 0.5)",
              boxShadow: isHovered ? "0 0 12px var(--accent)" : "0 0 0px transparent"
            }}
          />
          {label}
        </label>
        <motion.div 
          className="text-[0.65rem] font-black font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-[10px] shadow-sm"
          animate={{
            borderColor: isHovered ? "var(--accent)" : "transparent"
          }}
        >
          {value.toFixed(1)}
        </motion.div>
      </div>

      <div className="relative pt-2 pb-2">
        <div className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none px-[10px]">
          <div className="w-full h-[3px] bg-slate-200 dark:bg-slate-800 relative rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 bottom-0 left-0 bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.4)]"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full relative z-10 appearance-none bg-transparent outline-none cursor-pointer h-6"
          style={{ 'WebkitAppearance': 'none' }}
        />
        
        <div 
          className="absolute inset-y-0 left-0 flex items-center pointer-events-none px-[10px]"
          style={{ left: `calc(${percentage}% - 14px)` }}
        >
           <motion.div 
             className="w-5 h-5 rounded-full bg-white border-[3px] border-indigo-500 shadow-xl"
             animate={{ scale: isHovered ? 1.2 : 1 }}
           />
        </div>
      </div>

      {hint && (
        <p className="text-[0.6rem] text-slate-400 font-bold uppercase tracking-widest opacity-60 leading-relaxed px-1">
          {hint}
        </p>
      )}
    </div>
  );
}

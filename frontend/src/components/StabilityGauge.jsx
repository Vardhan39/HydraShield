import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

function getGaugeColor(score) {
  if (score > 7) return "#10b981"; // emerald-500
  if (score >= 4) return "#f59e0b"; // amber-500
  return "#ef4444"; // red-500
}

export default function StabilityGauge({ score = 0 }) {
  const value = Math.max(0, Math.min(10, score));
  const data = [{ name: "Stability", value }];
  const color = getGaugeColor(value);

  return (
    <div className="w-full flex flex-col items-center relative py-4">
      <div className="w-[240px] h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="100%"
            innerRadius="85%"
            outerRadius="100%"
            barSize={12}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 10]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: 'currentColor', className: 'text-slate-200 dark:text-slate-800' }}
              dataKey="value"
              cornerRadius={6}
              fill={color}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-[-4.5rem] text-center z-10 flex flex-col items-center"
      >
        <div className="lab-subtext mb-4">
          Stability Index
        </div>
        <motion.div 
          key={value}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-8xl font-black tabular-nums tracking-tighter text-slate-900 dark:text-white leading-none"
        >
          {value.toFixed(1)}
        </motion.div>
      </motion.div>
    </div>
  );
}

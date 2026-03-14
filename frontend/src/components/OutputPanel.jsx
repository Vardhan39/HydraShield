import React from "react";
import StabilityGauge from "./StabilityGauge.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, FileWarning, ShieldCheck, Activity, Cpu, Zap, Command } from "lucide-react";

export default function OutputPanel({ result, loading, mode }) {
  const isVideo = mode === "video";

  return (
    <div className="card p-1 sm:p-2 bg-gradient-to-br from-indigo-500/5 to-transparent border-none min-h-[500px] h-full overflow-hidden">
      <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-[calc(1rem-8px)] p-8 sm:p-10 flex flex-col h-full relative">
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-white/40 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-center flex-col gap-6"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin" />
                <Activity className="absolute inset-0 m-auto w-6 h-6 text-indigo-500 animate-pulse" />
              </div>
              <div className="text-center space-y-2">
                <span className="block text-xs font-black tracking-[0.3em] uppercase text-indigo-500 animate-pulse">
                  Processing Neural Ingress
                </span>
                <span className="block text-[0.6rem] font-mono text-slate-400 opacity-60">
                   Executing LSTM recursive analysis...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <header className="flex items-center justify-between mb-10 border-b dark:border-slate-800 pb-6">
          <div className="flex items-center gap-4">
             <Cpu className="w-5 h-5 text-indigo-500" />
             <h2 className="text-xl lab-header">
                Inference Laboratory
             </h2>
          </div>
          {result && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[0.6rem] font-black uppercase tracking-widest">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
              Real-time Output
            </div>
          )}
        </header>

        {!result ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400/50 space-y-6">
            <div className="w-24 h-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex items-center justify-center rotate-45">
              <Command className="w-8 h-8 -rotate-45 opacity-20" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-[0.65rem] font-black uppercase tracking-widest">Awaiting Valid Vector</p>
              <p className="text-[0.6rem] max-w-[180px] leading-relaxed font-medium">
                {isVideo 
                  ? "Initialize media pipeline to visualize temporal output."
                  : "Calibrate telemetry inputs to establish baseline stability."}
              </p>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col h-full space-y-10"
          >
            <div className="flex justify-center -my-4 transform scale-110">
              <StabilityGauge score={result.stability_score} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50/50 dark:bg-slate-900/40 border-2 border-slate-100 dark:border-slate-800 p-5 rounded-2xl transition-all hover:border-indigo-500/30">
                <div className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-400 font-black mb-2">Stability Status</div>
                <div className="font-black text-slate-900 dark:text-white uppercase text-lg flex items-center gap-3">
                  {result.risk_level === 'Safe' ? <ShieldCheck className="w-5 h-5 text-emerald-500" /> : result.risk_level === 'Moderate' ? <AlertCircle className="w-5 h-5 text-amber-500" /> : <FileWarning className="w-5 h-5 text-red-500" />}
                  {result.risk_level}
                </div>
              </div>
              
              <div className="bg-slate-50/50 dark:bg-slate-900/40 border-2 border-slate-100 dark:border-slate-800 p-5 rounded-2xl transition-all hover:border-indigo-500/30">
                <div className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-400 font-black mb-2">Hydroplaning Risk</div>
                <div className="font-black text-slate-900 dark:text-white uppercase text-lg">
                  {result.hydroplaning_risk}
                </div>
              </div>
            </div>

            <section className="relative group">
              <div className="absolute inset-0 bg-indigo-500/5 blur-xl group-hover:bg-indigo-500/10 transition-all rounded-2xl" />
              <div className="relative bg-white dark:bg-slate-900/80 border border-indigo-500/20 rounded-2xl p-6 shadow-xl shadow-indigo-500/5">
                <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.25em] text-indigo-500 font-black mb-3">
                  <Zap className="w-3.5 h-3.5 fill-current" /> Tactical Recommendation
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-relaxed italic">
                  "{result.recommendation}"
                </p>
              </div>
            </section>

            <div className="pt-8 border-t dark:border-slate-800">
               <h3 className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Neural Telemetry Metrics</h3>
               <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white dark:bg-slate-900/80 p-4 rounded-xl border-2 border-slate-50 dark:border-slate-800 text-center shadow-sm">
                    <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mb-1 tabular-nums">{result.trend_instability.toFixed(1)}</div>
                    <div className="text-[0.5rem] font-black uppercase tracking-tighter text-slate-400">Trend Var</div>
                  </div>
                  <div className="bg-white dark:bg-slate-900/80 p-4 rounded-xl border-2 border-slate-50 dark:border-slate-800 text-center shadow-sm">
                    <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mb-1 tabular-nums">{result.speed_fluctuation_index.toFixed(1)}</div>
                    <div className="text-[0.5rem] font-black uppercase tracking-tighter text-slate-400">Velo Delta</div>
                  </div>
                  <div className="bg-white dark:bg-slate-900/80 p-4 rounded-xl border-2 border-slate-50 dark:border-slate-800 text-center shadow-sm">
                    <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mb-1 tabular-nums">{result.hydroplaning_influence.toFixed(1)}</div>
                    <div className="text-[0.5rem] font-black uppercase tracking-tighter text-slate-400">Inertia Inf</div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

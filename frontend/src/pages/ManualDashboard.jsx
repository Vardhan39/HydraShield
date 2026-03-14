import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Activity, CloudRain, Droplets, Sun, Sliders, Layers, Cpu, Zap, Beaker } from "lucide-react";
import TelemetrySlider from "../components/TelemetrySlider.jsx";
import OutputPanel from "../components/OutputPanel.jsx";

const API_BASE = "http://localhost:5000";

const PRESETS = [
  { label: "Stability", icon: Sun, vals: { drift: 1, speed: 2, steering: 1, water: 0 }, color: 'bg-amber-500' },
  { label: "Hydro-Light", icon: CloudRain, vals: { drift: 3, speed: 4, steering: 3, water: 2 }, color: 'bg-indigo-400' },
  { label: "Hydro-Critical", icon: Droplets, vals: { drift: 7, speed: 8, steering: 6, water: 7 }, danger: true, color: 'bg-red-500' },
];

export default function ManualDashboard({ onBack }) {
  const [drift, setDrift] = useState(1);
  const [speed, setSpeed] = useState(2);
  const [steering, setSteering] = useState(1);
  const [water, setWater] = useState(0);
  const [sequence, setSequence] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activePreset, setActivePreset] = useState("Stability");

  useEffect(() => {
    const sample = { drift, speed, steering, water };
    setSequence((prev) => [...prev, sample].slice(-5));
    
    const isMatchingPreset = PRESETS.find(
      p => p.vals.drift === drift && p.vals.speed === speed && p.vals.steering === steering && p.vals.water === water
    );
    setActivePreset(isMatchingPreset ? isMatchingPreset.label : null);
  }, [drift, speed, steering, water]);

  useEffect(() => {
    const fetchPrediction = async () => {
      setError("");
      setLoading(true);
      try {
        const response = await axios.post(`${API_BASE}/predict-manual`, {
          sequence: sequence.length > 0 ? sequence : [{ drift, speed, steering, water }]
        });
        setResult(response.data);
      } catch (err) {
        setError("Inference engine offline. Verify backend connection.");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchPrediction, 500);
    return () => clearTimeout(timeoutId);
  }, [sequence]);

  const applyPreset = (preset) => {
    setDrift(preset.vals.drift);
    setSpeed(preset.vals.speed);
    setSteering(preset.vals.steering);
    setWater(preset.vals.water);
  };

  return (
    <div className="min-h-screen relative p-6 sm:p-10 lg:p-14 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1600px] mx-auto space-y-12 relative z-10"
      >
        {/* Navigation & Header */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-6">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-500 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Central Hub
            </button>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-indigo-500 mb-2">
                <Beaker className="w-5 h-5" />
                <span className="text-[0.65rem] font-black uppercase tracking-[0.3em]">Simulation Lab</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                MANUAL <span className="text-indigo-500">ENGINE.</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                Configure environmental tensors and telemetry variance to observe real-time inference patterns within our LSTM neural architecture.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
             {PRESETS.map(p => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p)}
                  className={`px-5 py-2.5 rounded-xl text-[0.65rem] font-black uppercase tracking-widest border transition-all flex items-center gap-3 ${
                    activePreset === p.label 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-xl ring-4 ring-indigo-500/10' 
                    : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 hover:border-indigo-500/50'
                  }`}
                >
                  <p.icon className={`w-4 h-4 ${activePreset === p.label ? 'text-indigo-500' : ''}`} />
                  {p.label}
                </button>
             ))}
          </div>
        </header>

        {/* Main Controls Cell */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start mt-6">
          <div className="xl:col-span-7 space-y-12">
            <section className="card p-1 sm:p-2 bg-gradient-to-br from-indigo-500/10 to-transparent border-none">
              <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-[calc(1rem-8px)] p-10 sm:p-16 space-y-20">
                <div className="flex items-center gap-6 border-b dark:border-slate-800 pb-12">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/40">
                    <Sliders className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-4xl lab-header">Configuration Engine</h2>
                    <p className="lab-subtext">Tuning Environmental Tensors</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-20">
                  <TelemetrySlider 
                    label="Drift Flux" 
                    value={drift} 
                    onChange={setDrift} 
                    hint="Temporal displacement intensity"
                  />
                  <TelemetrySlider 
                    label="Aquatic Depth" 
                    value={water} 
                    onChange={setWater} 
                    hint="Surface friction reduction coefficient"
                  />
                  <TelemetrySlider 
                    label="Lateral Instability" 
                    value={steering} 
                    onChange={setSteering} 
                    hint="Steering vector variance"
                  />
                  <TelemetrySlider 
                    label="Velocity Delta" 
                    value={speed} 
                    onChange={setSpeed} 
                    hint="Acceleration/Deceleration gradients"
                  />
                </div>
              </div>
            </section>

            {/* Ingress Buffer Display */}
            <section className="card p-8 sm:p-10 border-slate-200/60 dark:border-slate-800/60">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Ingress Sequence Buffer</h3>
                  </div>
                  <div className="px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded text-[0.6rem] font-bold uppercase tracking-widest leading-none">
                    Real-time Stream
                  </div>
               </div>
               
               <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 custom-scrollbar">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`relative min-w-[85px] h-20 flex-1 rounded-2xl transition-all duration-700 flex flex-col items-center justify-center border-2 border-dashed ${
                        i === 5 
                        ? 'bg-indigo-500 border-indigo-400 text-white scale-105 shadow-2xl shadow-indigo-500/40 border-solid' 
                        : 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 text-slate-400'
                      }`}
                    >
                      <span className="text-[0.6rem] font-black uppercase tracking-tighter opacity-60 mb-1">Vector</span>
                      <span className="text-sm font-black tracking-tight">{i === 5 ? 'LATEST' : `T-${5-i}`}</span>
                      
                      {i < 5 && (
                        <div className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 hidden sm:block opacity-20">
                          <Activity className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
               </div>
            </section>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest flex items-center gap-3"
                >
                  <Zap className="w-4 h-4" /> {error}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Inference Result Cell */}
          <div className="xl:col-span-5 xl:sticky xl:top-14 space-y-6">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-indigo-500/10 bg-indigo-500/5 w-fit mb-4">
              <Cpu className="w-4 h-4 text-indigo-500" />
              <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Inference Core Processing</span>
            </div>
            <OutputPanel result={result} loading={loading} mode="manual" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}


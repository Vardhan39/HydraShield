import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Activity, Video, ArrowRight, ShieldCheck, Cpu, ChevronRight, Zap } from "lucide-react";

export default function Landing({ onSelectMode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden bg-transparent">
      {/* Dynamic Animated Background */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-indigo-500/10 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </motion.div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] w-12 h-12 border border-indigo-500/20 rounded-lg"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[12%] w-16 h-16 border border-blue-500/20 rounded-full"
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl w-full text-center space-y-16 relative z-10"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-4 shadow-lg shadow-indigo-500/5 cursor-default"
          >
            <Zap className="w-3.5 h-3.5 fill-current" /> Advanced LSTM Analytics Active
          </motion.div>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.8] select-none">
            HYDRA<span className="text-indigo-500">SHIELD</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Revolutionizing road safety with proprietary temporal sequence modeling. 
            Establish real-time hydroplaning risk metrics with unparalleled precision.
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4"
        >
          {/* Manual Mode Card */}
          <button 
            onClick={() => onSelectMode("manual")}
            className="group relative card p-1 bg-gradient-to-br from-indigo-500/20 to-transparent border-none overflow-hidden hover:scale-[1.03] transition-all duration-500"
          >
            <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-[calc(1rem-4px)] p-10 flex flex-col h-full justify-between gap-12 text-left">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/40 group-hover:rotate-12 transition-all duration-500">
                  <Activity className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    Manual Mode <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    Access the simulation laboratory. Manually configure environmental tensors including water depth and drift scores to observe model stability trajectories.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-indigo-500 font-black text-xs uppercase tracking-widest pt-4 border-t border-slate-100 dark:border-slate-800">
                Initialize Sequence <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Video Mode Card */}
          <button 
            onClick={() => onSelectMode("video")}
            className="group relative card p-1 bg-gradient-to-br from-slate-400/20 to-transparent border-none overflow-hidden hover:scale-[1.03] transition-all duration-500"
          >
            <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-[calc(1rem-4px)] p-10 flex flex-col h-full justify-between gap-12 text-left">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center shadow-2xl group-hover:-rotate-12 transition-all duration-500">
                  <Video className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    Video Mode <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    Leverage our frame-based ingestion engine. Process dashcam footage to automatically extract motion vectors and safety indices.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest pt-4 border-t border-slate-100 dark:border-slate-800">
                Process Media <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-12 sm:gap-24 pt-8 opacity-40 grayscale group-hover:grayscale-0 transition-all border-t dark:border-slate-800 overflow-hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-slate-900 dark:text-white whitespace-nowrap">Safety Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-500" />
            <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-slate-900 dark:text-white whitespace-nowrap">Live Processing</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-500">
            <div className="relative">
              <Cpu className="w-5 h-5" />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-indigo-500 rounded-full blur-sm"
              />
            </div>
            <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-slate-900 dark:text-white whitespace-nowrap">Neural Core</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}


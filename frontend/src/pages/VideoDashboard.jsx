import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Video, UploadCloud, PlayCircle, Cpu, Zap, Activity, Info } from "lucide-react";
import OutputPanel from "../components/OutputPanel.jsx";

const API_BASE = "http://localhost:5000";

export default function VideoDashboard({ onBack }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("System idling. Awaiting media.");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setResult(null);
    setError("");
    const selected = e.target.files?.[0];
    setFile(selected || null);
    if (selected) {
      setStatus(`Media queued: ${selected.name}`);
    } else {
      setStatus("System idling. Awaiting media.");
    }
  };

  const handleAnalyze = async () => {
    setError("");
    if (!file) {
      setError("Protocols require a media file for ingestion.");
      return;
    }

    setLoading(true);
    setStatus("Extracting temporal features from ingress frames...");
    try {
      const formData = new FormData();
      formData.append("video", file);

      const response = await axios.post(`${API_BASE}/analyze-video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
      setStatus("Inference cycle complete.");
    } catch (err) {
      setError("Ingestion pipeline failed. Verify media format or backend status.");
      setStatus("Protocol interrupted.");
    } finally {
      setLoading(false);
    }
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
                <Video className="w-5 h-5" />
                <span className="text-[0.65rem] font-black uppercase tracking-[0.3em]">Temporal Frame Pipeline</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                VIDEO <span className="text-indigo-500">INGEST.</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                Execute frame-by-frame analysis on local footage to establish temporal road-slickness and stability metrics using RNN-LSTM modeling.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
          {/* Main Controls Cell */}
          <div className="xl:col-span-6 space-y-8">
            <section className="card p-1 sm:p-2 bg-gradient-to-br from-indigo-500/10 to-transparent border-none">
              <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-[calc(1rem-8px)] p-8 sm:p-12 space-y-10">
                <div className="flex items-center gap-4 border-b dark:border-slate-800 pb-10">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/40">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-4xl lab-header">Ingestion Pipeline</h2>
                    <p className="lab-subtext">Temporal Feature Extraction</p>
                  </div>
                </div>

                <div className="group relative border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 bg-slate-50/50 dark:bg-slate-900/20 rounded-3xl p-24 text-center transition-all cursor-pointer">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center gap-8">
                    <div className="w-24 h-24 rounded-[2rem] bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 group-hover:bg-indigo-500 text-slate-400 group-hover:text-white flex items-center justify-center transition-all duration-500 shadow-2xl group-hover:rotate-6">
                      <Video className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Select Sequence File</p>
                      <p className="text-[0.7rem] text-slate-500 mt-3 uppercase tracking-widest font-black opacity-40">
                        {file ? <span className="text-indigo-500 opacity-100">{file.name}</span> : 'MP4, AVI, MOV - DEPTH ANALYTICS'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t dark:border-slate-800 space-y-6">
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={loading || !file}
                    className="w-full relative group h-16 bg-indigo-500 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl disabled:opacity-30 transition-all overflow-hidden flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Processing Vector...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Initialize Inference</span>
                      </div>
                    )}
                  </button>

                  <div className="px-5 py-4 rounded-xl bg-slate-900 text-white/90 border border-white/5 font-mono text-[0.65rem] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-indigo-400 animate-pulse' : 'bg-emerald-400 shadow-[0_0_10px_#10b981]'}`} />
                      <span className="uppercase tracking-widest opacity-50 font-black">Cluster Status:</span>
                    </div>
                    <span className={loading ? 'text-indigo-400' : ''}>{status}</span>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-500 text-[0.65rem] font-black uppercase tracking-widest flex items-center gap-3"
                    >
                      <Zap className="w-4 h-4" /> {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            <section className="card p-8 border-slate-200/60 dark:border-slate-800/60 flex items-start gap-4">
               <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
                  <Info className="w-4 h-4" />
               </div>
               <div>
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Technical Overview</h3>
                 <p className="text-xs text-slate-500 leading-relaxed font-medium">
                   The ingestion pipeline establishes a motion tensor from raw frames. Each temporal slice is validated against our LSTM sequence model to detect micro-fluid interaction signatures.
                 </p>
               </div>
            </section>
          </div>

          <div className="xl:col-span-6 xl:sticky xl:top-14 space-y-6">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-indigo-500/10 bg-indigo-500/5 w-fit mb-4">
              <Cpu className="w-4 h-4 text-indigo-500" />
              <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Inference core streaming</span>
            </div>
            <OutputPanel result={result} loading={loading} mode="video" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}


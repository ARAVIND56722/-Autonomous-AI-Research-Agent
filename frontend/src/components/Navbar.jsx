import React from "react";
import { Sparkles } from "lucide-react";

function Navbar() {
  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              Autonomous AI Research Agent
            </h1>
            <p className="text-xs text-slate-500">
              RAG • AI Agents • LLM Reasoning
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl text-slate-600 font-medium hover:bg-white/60 transition">
            Home
          </button>
          <button className="px-4 py-2 rounded-xl text-slate-600 font-medium hover:bg-white/60 transition">
            Features
          </button>
          <button className="px-4 py-2 rounded-xl text-slate-600 font-medium hover:bg-white/60 transition">
            Workflow
          </button>
          <button className="px-5 py-2.5 rounded-2xl bg-white text-slate-700 font-semibold shadow-sm border border-rose-100">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import React from "react";

function HeroSection() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 bg-white/80 border border-rose-200 rounded-full px-4 py-2 text-rose-600 text-sm font-medium shadow-sm">
        Autonomous Research Intelligence
      </div>

      <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-800">
        Search papers,
        <span className="text-rose-500"> read intelligently,</span>
        <br />
        generate insights and
        <span className="text-orange-400"> answer questions</span>
      </h1>

      <p className="mt-5 text-lg text-slate-600 leading-8 max-w-2xl">
        A modern GenAI platform that searches research papers, reads them,
        extracts important findings, generates insights, and answers user
        questions using RAG, AI Agents, and LLM reasoning.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold shadow-lg">
          Explore Dashboard
        </button>
        <button className="px-6 py-3 rounded-2xl bg-white border border-rose-200 text-slate-700 font-semibold">
          View Workflow
        </button>
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/80 rounded-3xl p-4 shadow-sm border border-white">
          <h3 className="text-2xl font-bold">10K+</h3>
          <p className="text-sm text-slate-500 mt-1">Paper Access</p>
        </div>
        <div className="bg-white/80 rounded-3xl p-4 shadow-sm border border-white">
          <h3 className="text-2xl font-bold">RAG</h3>
          <p className="text-sm text-slate-500 mt-1">Grounded Answers</p>
        </div>
        <div className="bg-white/80 rounded-3xl p-4 shadow-sm border border-white">
          <h3 className="text-2xl font-bold">Agents</h3>
          <p className="text-sm text-slate-500 mt-1">Smart Workflow</p>
        </div>
        <div className="bg-white/80 rounded-3xl p-4 shadow-sm border border-white">
          <h3 className="text-2xl font-bold">LLM</h3>
          <p className="text-sm text-slate-500 mt-1">Reasoning Power</p>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
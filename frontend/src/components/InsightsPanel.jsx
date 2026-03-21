import React from "react";
import { Sparkles, TrendingUp, Lightbulb, ShieldCheck } from "lucide-react";

function InsightsPanel({ insightsData, query }) {
  const topic = query || "Autonomous AI Research";

  const insights = insightsData || {
    topic,
    key_insight:
      `RAG improves the reliability of ${topic} workflows by grounding answers in retrieved paper content.`,
    research_trend:
      `AI agents can automate literature review tasks such as search, filtering, summarization, and comparison for ${topic}.`,
    research_gap:
      `LLM reasoning helps identify trends and gaps in ${topic}, but strong grounding is still important.`,
    why_it_matters:
      `This section shows how the agent converts retrieved papers into useful insights for ${topic}.`,
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-sm font-medium text-rose-500">Generated Insights</p>
          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            Insight panel
          </h2>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-white/80 text-slate-600 border border-white shadow-sm">
          Topic: {insights.topic}
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="bg-white/80 rounded-3xl p-6 shadow-sm border border-white">
          <div className="p-3 rounded-2xl bg-rose-100 text-rose-500 w-fit">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-slate-800">
            Key Insight
          </h3>
          <p className="mt-3 text-sm text-slate-600 leading-7">
            {insights.key_insight}
          </p>
        </div>

        <div className="bg-white/80 rounded-3xl p-6 shadow-sm border border-white">
          <div className="p-3 rounded-2xl bg-orange-100 text-orange-500 w-fit">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-slate-800">
            Research Trend
          </h3>
          <p className="mt-3 text-sm text-slate-600 leading-7">
            {insights.research_trend}
          </p>
        </div>

        <div className="bg-white/80 rounded-3xl p-6 shadow-sm border border-white">
          <div className="p-3 rounded-2xl bg-pink-100 text-pink-500 w-fit">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-slate-800">
            Research Gap
          </h3>
          <p className="mt-3 text-sm text-slate-600 leading-7">
            {insights.research_gap}
          </p>
        </div>
      </div>

      <div className="mt-6 bg-white/80 rounded-3xl p-6 shadow-sm border border-white">
        <div className="flex items-center gap-2 text-slate-800 font-semibold">
          <ShieldCheck className="w-5 h-5 text-rose-500" />
          Why this matters
        </div>
        <p className="mt-3 text-sm text-slate-600 leading-7">
          {insights.why_it_matters}
        </p>
      </div>
    </div>
  );
}

export default InsightsPanel;
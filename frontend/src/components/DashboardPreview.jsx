import React from "react";
import { Brain, Search, FileText, Sparkles } from "lucide-react";

function DashboardPreview() {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-[30px] p-6 shadow-xl border border-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Research Workspace</p>
          <h2 className="text-2xl font-bold mt-1 text-slate-800">
            Agent Dashboard
          </h2>
        </div>
        <div className="p-3 rounded-2xl bg-rose-100 text-rose-500">
          <Brain className="w-6 h-6" />
        </div>
      </div>

      <div className="mt-6 bg-rose-50 rounded-3xl p-4 border border-rose-100">
        <div className="flex items-center gap-2 text-rose-500 font-semibold text-sm">
          <Search className="w-4 h-4" />
          Active Query
        </div>
        <p className="mt-2 text-slate-700 text-sm leading-6">
          Find recent research papers on autonomous AI agents for scientific
          analysis and generate comparative insights.
        </p>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <FileText className="w-4 h-4 text-orange-500" />
            Papers Read
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-800">24</p>
          <p className="text-sm text-slate-500 mt-1">Relevant papers found</p>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Sparkles className="w-4 h-4 text-rose-500" />
            Insights Generated
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-800">08</p>
          <p className="text-sm text-slate-500 mt-1">Cross-paper insights</p>
        </div>
      </div>

      <div className="mt-5 bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800">Insight Preview</h3>
        <ul className="mt-3 space-y-3 text-sm text-slate-600">
          <li>• RAG improves grounded research answers.</li>
          <li>• AI agents automate multi-step paper analysis.</li>
          <li>• LLM reasoning helps compare methods and results.</li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardPreview;
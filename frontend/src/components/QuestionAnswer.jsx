import React, { useState } from "react";
import { MessageSquare, Send, Bot } from "lucide-react";

function QuestionAnswer({ query, onAsk, answer, askLoading }) {
  const [question, setQuestion] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;
    await onAsk(question);
  };

  return (
    <div className="mt-16 bg-white/70 backdrop-blur-md rounded-[30px] p-6 md:p-8 shadow-xl border border-white">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm font-medium text-rose-500">Research Q&A</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            Ask questions about the papers
          </h2>
          <p className="mt-3 text-slate-600 leading-7 max-w-3xl">
            Ask a question after selecting a paper. The answer will use the
            selected paper abstract as context.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-rose-100 text-rose-500">
          <MessageSquare className="w-6 h-6" />
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Ask a question about the selected paper..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 px-5 py-4 rounded-2xl border border-rose-200 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-rose-300"
        />

        <button
          onClick={handleAsk}
          className="px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold shadow-lg flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Ask
        </button>
      </div>

      <div className="mt-6 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-100 text-orange-500">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Agent Answer</h3>
            <p className="text-sm text-slate-500">
              Generated from selected paper context
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600 leading-7 whitespace-pre-wrap">
          {askLoading
            ? "Downloading, indexing, and generating answer from selected paper... (This might take a few moments for the first query)"
            : answer || `Select a paper from ${query} search results and ask a question here.`}
        </p>
      </div>
    </div>
  );
}

export default QuestionAnswer;
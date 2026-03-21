import React, { useState } from "react";
import { Search } from "lucide-react";

function SearchSection({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <div className="mt-16 bg-white/70 backdrop-blur-md rounded-[30px] p-6 md:p-8 shadow-xl border border-white">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-rose-500">Research Search</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-800">
          Search for research papers
        </h2>
        <p className="mt-3 text-slate-600 leading-7">
          Enter a topic like AI agents, blockchain in supply chain, RAG systems,
          or healthcare LLMs to explore research papers and insights.
        </p>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter research topic..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-rose-200 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-rose-300"
          />
        </div>

        <button
          onClick={handleSearch}
          className="px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold shadow-lg flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Search Papers
        </button>
      </div>
    </div>
  );
}

export default SearchSection;
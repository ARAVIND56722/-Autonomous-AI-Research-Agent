import React from "react";
import { FileText, ExternalLink, BookOpen } from "lucide-react";

function PaperResults({ papers, onReadPaper }) {
  return (
    <div className="mt-16">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-sm font-medium text-rose-500">Search Results</p>
          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            Research papers
          </h2>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-white/80 text-slate-600 border border-white shadow-sm">
          {papers.length} papers found
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {papers.map((paper) => (
          <div
            key={paper.id}
            className="bg-white/80 rounded-3xl p-6 shadow-sm border border-white hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="p-3 rounded-2xl bg-rose-100 text-rose-500">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-orange-50 text-orange-500 font-medium">
                {paper.year}
              </span>
            </div>

            <h3 className="mt-5 text-xl font-semibold text-slate-800 leading-8">
              {paper.title}
            </h3>

            <p className="mt-3 text-sm text-slate-500">{paper.authors}</p>

            <p className="mt-4 text-sm text-slate-600 leading-7">
              {paper.summary}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onReadPaper(paper.arxiv_id)}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Read Paper
              </button>

              {paper.link && (
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-rose-500 transition"
                >
                  Abstract
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaperResults;
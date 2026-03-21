import React from "react";
import { BookOpen, ExternalLink, FileText, CalendarDays, Tags } from "lucide-react";

function PaperReader({ paper, loading }) {
    if (loading) {
        return (
            <div className="mt-16 bg-white/80 rounded-3xl p-6 shadow-sm border border-white text-slate-600">
                Loading paper details...
            </div>
        );
    }

    if (!paper) {
        return (
            <div className="mt-16 bg-white/80 rounded-3xl p-6 shadow-sm border border-white">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-rose-100 text-rose-500">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Paper Reader</h3>
                        <p className="text-sm text-slate-500">
                            Click “Read Paper” on any result to view its details here.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-16 bg-white/80 rounded-3xl p-6 md:p-8 shadow-sm border border-white">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <p className="text-sm font-medium text-rose-500">Paper Reader</p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-800">
                        {paper.title}
                    </h2>
                    <p className="mt-3 text-slate-500">{paper.authors}</p>
                </div>

                <div className="p-3 rounded-2xl bg-rose-100 text-rose-500">
                    <BookOpen className="w-6 h-6" />
                </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <CalendarDays className="w-4 h-4 text-orange-500" />
                        Published
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{paper.published || "N/A"}</p>
                </div>

                <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <FileText className="w-4 h-4 text-rose-500" />
                        arXiv ID
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{paper.arxiv_id}</p>
                </div>
            </div>

            <div className="mt-6 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-semibold text-slate-800">Abstract</h3>
                <p className="mt-4 text-sm text-slate-600 leading-7">{paper.summary}</p>
            </div>

            <div className="mt-6 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <Tags className="w-5 h-5 text-pink-500" />
                    Categories
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {(paper.categories || []).length > 0 ? (
                        paper.categories.map((category) => (
                            <span
                                key={category}
                                className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-medium"
                            >
                                {category}
                            </span>
                        ))
                    ) : (
                        <span className="text-sm text-slate-500">No categories available</span>
                    )}
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
                {paper.link && (
                    <a
                        href={paper.link}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 rounded-2xl bg-white border border-rose-200 text-slate-700 font-semibold flex items-center gap-2"
                    >
                        View Abstract
                        <ExternalLink className="w-4 h-4" />
                    </a>
                )}

                {paper.pdf_link && (
                    <a
                        href={paper.pdf_link}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold flex items-center gap-2"
                    >
                        Open PDF
                        <ExternalLink className="w-4 h-4" />
                    </a>
                )}
            </div>
        </div>
    );
}

export default PaperReader;
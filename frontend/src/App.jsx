import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import DashboardPreview from "./components/DashboardPreview";
import FeaturesSection from "./components/FeaturesSection";
import SearchSection from "./components/SearchSection";
import PaperResults from "./components/PaperResults";
import PaperReader from "./components/PaperReader";
import InsightsPanel from "./components/InsightsPanel";
import QuestionAnswer from "./components/QuestionAnswer";
import {
  searchPapers,
  fetchInsights,
  askQuestion,
  readPaper,
} from "./services/api";

function App() {
  const defaultPapers = [];
  const defaultInsights = {
    topic: "Autonomous AI Research",
    key_insight:
      "RAG improves the reliability of Autonomous AI Research workflows by grounding answers in retrieved research paper content.",
    research_trend:
      "AI agents are increasingly used to automate multi-step literature review and comparison tasks.",
    research_gap:
      "LLM reasoning is powerful, but strong factual grounding is still needed for trustworthy research assistance.",
    why_it_matters:
      "This helps users move beyond simple search and understand important findings faster.",
  };

  const [papers, setPapers] = useState(defaultPapers);
  const [currentQuery, setCurrentQuery] = useState("Autonomous AI Research");
  const [insightsData, setInsightsData] = useState(defaultInsights);
  const [qaAnswer, setQaAnswer] = useState("");
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [loading, setLoading] = useState(false);
  const [askLoading, setAskLoading] = useState(false);
  const [paperLoading, setPaperLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    setCurrentQuery(query);
    setLoading(true);
    setError("");
    setQaAnswer("");
    setSelectedPaper(null);

    try {
      const [papersResponse, insightsResponse] = await Promise.all([
        searchPapers(query),
        fetchInsights(query),
      ]);

      setPapers(papersResponse.papers || []);
      setInsightsData(insightsResponse.insights || defaultInsights);
    } catch (err) {
      setError("Failed to fetch data from backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async (question) => {
    setAskLoading(true);

    try {
      const response = await askQuestion(
        currentQuery,
        question,
        selectedPaper?.summary || "",
        selectedPaper?.title || ""
      );
      setQaAnswer(response.response?.answer || "No answer received.");
    } catch (err) {
      setQaAnswer("Failed to fetch answer from backend.");
    } finally {
      setAskLoading(false);
    }
  };

  const handleReadPaper = async (arxivId) => {
    setPaperLoading(true);

    try {
      const response = await readPaper(arxivId);
      setSelectedPaper(response.paper || null);
      setQaAnswer("");
    } catch (err) {
      setSelectedPaper(null);
    } finally {
      setPaperLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 text-slate-800">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <HeroSection />
          <DashboardPreview />
        </div>

        <FeaturesSection />
        <SearchSection onSearch={handleSearch} />

        {loading && (
          <div className="mt-8 bg-white/80 rounded-3xl p-5 shadow-sm border border-white text-slate-600">
            Loading papers and insights from backend...
          </div>
        )}

        {error && (
          <div className="mt-8 bg-red-50 border border-red-200 text-red-600 rounded-3xl p-5 shadow-sm">
            {error}
          </div>
        )}

        {!loading && !error && (
          <PaperResults papers={papers} onReadPaper={handleReadPaper} />
        )}

        <PaperReader paper={selectedPaper} loading={paperLoading} />

        {!loading && !error && (
          <InsightsPanel insightsData={insightsData} query={currentQuery} />
        )}

        <QuestionAnswer
          query={currentQuery}
          onAsk={handleAsk}
          answer={qaAnswer}
          askLoading={askLoading}
        />
      </div>
    </div>
  );
}

export default App;
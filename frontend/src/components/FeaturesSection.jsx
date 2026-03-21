import React from "react";
import { Search, FileText, Sparkles, Brain } from "lucide-react";

function FeaturesSection() {
  const features = [
    {
      icon: Search,
      title: "Search Papers",
      description: "Search research papers from trusted academic sources.",
      color: "text-rose-500",
    },
    {
      icon: FileText,
      title: "Read Papers",
      description: "Extract abstracts, methods, and important findings.",
      color: "text-orange-500",
    },
    {
      icon: Sparkles,
      title: "Generate Insights",
      description: "Compare papers and identify trends, gaps, and conclusions.",
      color: "text-pink-500",
    },
    {
      icon: Brain,
      title: "Answer Questions",
      description: "Get answers backed by retrieved research context.",
      color: "text-amber-500",
    },
  ];

  return (
    <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className="bg-white/80 rounded-3xl p-6 shadow-sm border border-white"
          >
            <Icon className={`w-6 h-6 ${feature.color}`} />
            <h3 className="mt-4 text-xl font-semibold text-slate-800">
              {feature.title}
            </h3>
            <p className="mt-2 text-slate-600 text-sm leading-7">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default FeaturesSection;
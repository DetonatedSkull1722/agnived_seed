import React from "react";
import { CheckCircle, Download } from "lucide-react";

interface ResultsPanelProps {
  results: {
    stats: {
      [key: string]: {
        pct: number;
        area: number;
      };
    };
    files: string[];
  };
  theme: "dark" | "light";
}

export default function ResultsPanel({ results, theme }: ResultsPanelProps) {
  return (
    <div className={`rounded-2xl p-6 shadow-xl ${theme === "dark" ? "bg-slate-900 border border-slate-800" : "bg-white border border-gray-200"}`}>
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <h3 className="font-semibold">Results</h3>
      </div>
      <div className="space-y-3 mb-4">
        <h4 className="text-sm font-medium text-green-300">Land Cover Statistics</h4>
        {Object.entries(results.stats).map(([key, value]: any) => (
          <div key={key} className={`p-3 rounded-lg ${theme === "dark" ? "bg-slate-800" : "bg-gray-50"}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium capitalize">{key}</span>
              <span className="text-sm font-bold">{value.pct}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div style={{ width: `${value.pct}%` }} className="h-full bg-green-600" />
              </div>
              <span className="text-xs text-green-300">{value.area.toFixed(2)} km²</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h4 className="text-sm font-medium text-green-300 mb-3">Generated Files</h4>
        <div className="space-y-2">
          {results.files.map((file: string, i: number) => (
            <button key={i} className={`w-full p-3 rounded-lg text-left flex items-center justify-between ${theme === "dark" ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-50 hover:bg-gray-100"}`}>
              <span className="text-sm font-mono">{file}</span>
              <Download className="w-4 h-4 text-blue-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
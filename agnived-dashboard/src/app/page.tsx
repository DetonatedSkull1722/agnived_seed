"use client";
import React, { useState } from "react";
import Header from "@/../components/layout/Header";
import Sidebar from "@/../components/layout/Sidebar";
import MapPanel from "@/../components/map/MapPanel";
import PipelineStatus from "@/../components/shared/PipelineStatus";
import ResultsPanel from "@/../components/results/ResultsPanel";

// Example PNG background (put your PNG in /public/bg.png)
const backgroundStyle = {
  background: "linear-gradient(135deg, #0f2d25 0%, #183c2b 100%)",
  backgroundImage: "url('/bg.png')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  minHeight: "100vh",
};

export default function AgniVedDashboard() {
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("landcover");
  const [aoi, setAoi] = useState({ lon: 77.5946, lat: 12.9716, buffer_km: 1.2 });
  const [logs, setLogs] = useState<{ time: string; message: string }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  const [layers, setLayers] = useState({
    vegetation: true,
    changeDetection: false,
    animalInference: false,
  });

  return (
    <div style={backgroundStyle}>
      <Header theme={theme} setTheme={setTheme} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-4 space-y-6">
            <Sidebar
              aoi={aoi}
              setAoi={setAoi}
              layers={layers}
              setLayers={setLayers}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              logs={logs}
              setLogs={setLogs}
              setResults={setResults}
            />
            <PipelineStatus logs={logs} setLogs={setLogs} />
          </aside>
          <main className="lg:col-span-8 space-y-6">
            <MapPanel aoi={aoi} layers={layers} setLayers={setLayers} theme={theme} />
            {results && <ResultsPanel results={results} theme={theme} />}
          </main>
        </div>
      </div>
    </div>
  );
}
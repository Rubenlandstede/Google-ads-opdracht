import React, { useState } from "react";
import TopDashboard from "./TopDashboard";
import Framework1 from "./Framework1";
import Framework2 from "./Framework2";
import Framework3 from "./Framework3"; // 


import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Target,
  DollarSign,
  Globe,
  Layout,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { pillars } from "./pillarsData";
import {
  getScoreColor,
  getScoreIcon,
  getScoreLabel,
  calculateTotalScore,
  calculatePercentage,
} from "./helpers.jsx";
import { generatePDF } from "./PdfReport";
import "./styles.css";

const GoogleAdsAuditDashboard = () => {
  const [scores, setScores] = useState(() =>
    Object.fromEntries(
      pillars.map((p) => [
        p.key,
        Object.fromEntries(p.subcriteria.map((s) => [s.key, 0.5])),
      ])
    )
  );
  const [context, setContext] = useState({});
  const [expandedPillars, setExpandedPillars] = useState({});

  const updateScore = (pillar, subcriterion, score) => {
    setScores((prev) => ({
      ...prev,
      [pillar]: {
        ...prev[pillar],
        [subcriterion]: score,
      },
    }));
  };

  const updateContext = (pillar, subcriterion, text) => {
    setContext((prev) => ({
      ...prev,
      [`${pillar}_${subcriterion}`]: text,
    }));
  };

  const togglePillar = (key) => {
    setExpandedPillars((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalScore = calculateTotalScore(scores, pillars);
  const percentage = calculatePercentage(scores, pillars);

 return (
  <div className="dashboard-container">
    {/* 🔹 Top gedeelte met donut en overzicht */}
    <TopDashboard
      percentage={percentage}
      totalScore={totalScore}
      pillars={pillars}
      scores={scores}
    />

    {/* 🔹 Framework 1 overzicht */}
    <Framework1
      pillars={pillars}
      scores={scores}
      expandedPillars={expandedPillars}
      togglePillar={togglePillar}
      updateScore={updateScore}
      updateContext={updateContext}
      context={context}
    />

    <Framework2 pillars={pillars} scores={scores} />
    <Framework3 pillars={pillars} scores={scores} />



    {/* 🔹 PDF export knop */}
    <button className="pdf-button" onClick={() => generatePDF(scores, pillars)}>
      Genereer PDF
    </button>
  </div>
);

};

export default GoogleAdsAuditDashboard;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this AT THE TOP
import TopDashboard from "./TopDashboard";
import Framework1 from "./Framework1";
import Framework2 from "./Framework2";
import Framework3 from "./Framework3";
import { pillars } from "./pillarsData";
import {
  calculateTotalScore,
  calculatePercentage,
} from "./helpers.jsx";

import "./styles.css";

const GoogleAdsAuditDashboard = () => {
  const navigate = useNavigate(); // ✅ Add this INSIDE your component

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
  const safeScores = JSON.parse(JSON.stringify(scores));
  console.log("Rendering Dashboard with scores:", safeScores);
  return (
      <div className="dashboard-container">
      {/* 🔹 Top Section */}
      <TopDashboard
        percentage={percentage}
        totalScore={totalScore}
        pillars={pillars}
        scores={scores}
      />

      {/* 🔹 Frameworks */}
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
      <Framework3 pillars={pillars} scores={scores} context={context} />

      
      <button
  className="pdf-button"
  onClick={() => {
    // Clone safely to remove React symbols
    const dataToSend = {
      scores: JSON.parse(JSON.stringify(scores)),
      pillars: JSON.parse(JSON.stringify(pillars)),
      context: JSON.parse(JSON.stringify(context)),
      totalScore,
      percentage,
    };

    console.log("📤 Sending data to PDF page:", dataToSend); // debug log

    navigate("/pdf", { state: dataToSend });
  }}
>
  Genereer PDF
</button>







    </div>
  );
};

export default GoogleAdsAuditDashboard;



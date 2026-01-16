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
  const navigate = useNavigate(); 

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

         <img 
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAxRz12LQZcG32COgwPqxc8aLMcBZWYgW_gw&s" 
    alt="Logo" 
     style={{
    width: "150px",
    display: "block",
    margin: "0 auto 20px",
  }}
  />
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
    const dataToSend = {
      scores: JSON.parse(JSON.stringify(scores)),
      pillars: JSON.parse(JSON.stringify(pillars)),
      context: JSON.parse(JSON.stringify(context)),
      totalScore,
      percentage,
      
    };

    // Debug: check wat er gestuurd wordt
    console.log("Sending data to PDF page:", dataToSend);

    navigate("/pdf", { state: dataToSend });
  }}
>
  Genereer PDF
</button>

<br></br>
<br></br>
<br></br>

<footer className="dashboard-footer bg-gradient-to-br from-[#eef4ff] to-[#cfe2ff] border-t border-blue-200 shadow-inner">
  <div className="max-w-6xl mx-auto py-10 px-6 grid md:grid-cols-3 gap-8 text-gray-700">
    
    {/* Contact Info */}
    <div>
      <h4 className="font-semibold text-lg mb-3 text-gray-800">Contact</h4>
      <p className="text-sm">info@neosem.nl</p>
      <p className="text-sm">0342 786 925</p>
      <p className="text-sm">Energieweg 60</p>
      <p className="text-sm">3771 NA Barneveld</p>
    </div>

    {/* Openingstijden */}
    <div>
      <h4 className="font-semibold text-lg mb-3 text-gray-800">Openingstijden</h4>
      <ul className="text-sm space-y-1">
        <li>Ma: 09:00 - 17:00</li>
        <li>Di: 09:00 - 17:00</li>
        <li>Wo: 09:00 - 17:00</li>
        <li>Do: 09:00 - 17:00</li>
        <li>Vr: 09:00 - 17:00</li>
        <li>Za: Gesloten</li>
        <li>Zo: Gesloten</li>
      </ul>
    </div>

  </div>

  <div className="text-center text-gray-500 text-sm py-4 border-t border-blue-200">
    &copy; 2025 Neosem. Alle rechten voorbehouden.
  </div>
</footer>











    </div>

    
  );


};



export default GoogleAdsAuditDashboard;



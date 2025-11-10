import React from "react";
import { useLocation } from "react-router-dom";

const PdfPage = () => {
  const location = useLocation();
  const state = location.state;

  if (!state) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-xl">
        ⚠️ Geen data gevonden
      </div>
    );
  }

  const { scores, pillars, context, totalScore, percentage } = state;

  // Helper – detecteer beoordelingstype
  const getStatus = (text) => {
    if (!text) return "onbekend";
    const t = text.toLowerCase();
    if (t.includes("goed")) return "goed";
    if (t.includes("matig")) return "matig";
    if (t.includes("slecht")) return "slecht";
    return "onbekend";
  };

  // Kleuren per status
  const statusStyles = {
    goed: "bg-green-100 text-green-700 border-green-400",
    matig: "bg-yellow-100 text-yellow-700 border-yellow-400",
    slecht: "bg-red-100 text-red-700 border-red-400",
    onbekend: "bg-gray-100 text-gray-700 border-gray-300",
  };

  return (
    <div className="min-h-screen bg-[#f5f8ff] py-10 px-6 flex flex-col items-center">
      {/* 🔹 Titel */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Google Ads Audit PDF Samenvatting
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Overzicht van alle ingevulde bevindingen
      </p>

      {/* 🔹 Score Kaart */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center w-full max-w-2xl mb-10">
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Overzicht Performance
        </h3>

        <div className="text-center mb-3">
          <div
            className={`text-4xl font-bold ${
              percentage < 40
                ? "text-red-500"
                : percentage < 70
                ? "text-orange-500"
                : "text-green-500"
            }`}
          >
            {Math.round(percentage)}%
          </div>
          <div className="text-gray-500 text-sm">Performance</div>
          <div className="text-gray-600 text-sm">
            {totalScore.toFixed(1)} /{" "}
            {pillars.reduce((sum, p) => sum + (p.subcriteria?.length || 0), 0)}
          </div>
        </div>

        <div
          className={`px-4 py-2 rounded-lg text-sm font-medium mb-2 ${
            percentage < 40
              ? "bg-red-100 text-red-600"
              : percentage < 70
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {percentage < 40 ? "Zwak" : percentage < 70 ? "Matig" : "Goed"}
        </div>
      </div>

      {/* 🔹 Framework 3 Samenvatting */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-5xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Framework 3 Samenvatting
        </h3>

        {pillars.map((pillar) => (
          <div key={pillar.key} className="mb-8">
            {/* Pilar Titel */}
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              {pillar.name}
            </h4>

            {/* Subcriteria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pillar.subcriteria.map((sub) => {
                const text = context[`${pillar.key}_${sub.key}`];
                const status = getStatus(text);
                return (
                  <div
                    key={sub.key}
                    className={`p-4 rounded-xl border ${statusStyles[status]} shadow-sm`}
                  >
                    <div className="font-medium text-gray-900 mb-1">
                      {sub.name}
                    </div>
                    <p className="text-sm whitespace-pre-wrap">
                      {text ? text : "Geen opmerking ingevuld"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfPage;













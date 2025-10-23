import React from "react";
import {
  getScoreColor,
  calculatePercentage,
} from "./helpers.jsx";

const Framework2 = ({ pillars, scores }) => {
  const getLabel = (value) => {
    if (value < 40) return { text: "Kritiek", color: "bg-red-100 text-red-500" };
    if (value < 70) return { text: "Matig", color: "bg-orange-100 text-orange-500" };
    if (value < 100) return { text: "Goed", color: "bg-green-100 text-green-500" };
    return { text: "Uitstekend", color: "bg-emerald-100 text-emerald-600" };
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-8 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Framework 2: Voortgang per Pijler
      </h2>

      {/* Pillars */}
      <div className="flex flex-wrap justify-between gap-6">
        {pillars.map((pillar) => {
          const percent = calculatePercentage(
            { [pillar.key]: scores[pillar.key] },
            [pillar]
          );
          const total = pillar.subcriteria.length;
          const achieved = Object.values(scores[pillar.key]).reduce(
            (a, b) => a + b,
            0
          );
          const label = getLabel(percent);

          return (
            <div
              key={pillar.key}
              className="flex flex-col items-center w-[120px]"
            >
              {/* Icon + Title */}
              <div className="flex flex-col items-center mb-2">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-xl mb-1"
                  style={{ backgroundColor: `${pillar.color}20` }}
                >
                  <pillar.icon size={22} color={pillar.color} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {pillar.name}
                </span>
              </div>

              {/* Vertical progress bar */}
              <div className="relative h-40 w-6 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className="absolute bottom-0 left-0 w-full rounded-full transition-all duration-700"
                  style={{
                    height: `${percent}%`,
                    backgroundColor: pillar.color,
                  }}
                ></div>
              </div>

              {/* Percentage */}
              <div
                className={`text-sm font-semibold ${label.color.split(" ")[1]}`}
              >
                {Math.round(percent)}%
              </div>

              {/* Score */}
              <div className="text-xs text-gray-500">
                {achieved.toFixed(1)} / {total}
              </div>

              {/* Label */}
              <div
                className={`text-xs mt-1 px-2 py-0.5 rounded-md font-medium ${label.color}`}
              >
                {label.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-4 mt-6 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-400 rounded-sm"></span>
          0–40% Kritiek
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-orange-400 rounded-sm"></span>
          40–60% Matig
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-400 rounded-sm"></span>
          60–80% Goed
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-emerald-500 rounded-sm"></span>
          80–100% Uitstekend
        </div>
      </div>
    </div>
  );
};

export default Framework2;

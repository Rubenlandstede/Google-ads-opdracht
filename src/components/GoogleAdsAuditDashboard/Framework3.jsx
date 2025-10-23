import React from "react";
import { DollarSign, Globe, Target, Layout, FileText } from "lucide-react";
import { getScoreColor, calculatePercentage } from "./helpers";

const iconMap = {
  prijs: DollarSign,
  website: Globe,
  campagnestructuur: Layout,
  advertenties: FileText,
  budgettargets: Target,
};

const Framework3 = ({ pillars, scores }) => {
  const getPillarPercentage = (pillar) => {
    const subScores = Object.values(scores[pillar.key]);
    const avg = subScores.reduce((a, b) => a + b, 0) / subScores.length;
    return Math.round(avg * 100);
  };

  const grouped = {
    kritiek: [],
    verbetering: [],
    goed: [],
  };

  pillars.forEach((pillar) => {
    const percentage = getPillarPercentage(pillar);
    if (percentage < 50) grouped.kritiek.push({ ...pillar, percentage });
    else if (percentage < 80) grouped.verbetering.push({ ...pillar, percentage });
    else grouped.goed.push({ ...pillar, percentage });
  });

  const renderGroup = (title, color, bg, items) => (
    <div className={`rounded-xl border-2 ${color} ${bg} p-4 mb-6`}>
      <h3 className={`font-semibold mb-4 flex items-center`}>
        <span
          className={`w-3 h-3 rounded-full mr-2 ${
            color.includes("red") ? "bg-red-500" : color.includes("yellow") ? "bg-yellow-500" : "bg-green-500"
          }`}
        ></span>
        {title}
      </h3>

      {items.map((pillar) => {
        const Icon = iconMap[pillar.key.toLowerCase()] || Layout;
        return (
          <div
            key={pillar.key}
            className={`flex justify-between items-center border rounded-lg p-3 mb-3 ${
              color.includes("red")
                ? "border-red-300"
                : color.includes("yellow")
                ? "border-yellow-300"
                : "border-green-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                className={`${
                  color.includes("red")
                    ? "text-red-500"
                    : color.includes("yellow")
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              />
              <div>
                <p className="font-medium">{pillar.title}</p>
                <p className="text-xs text-gray-500">
                  {pillar.subcriteria.length} subcriteria
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded ${
                color.includes("red")
                  ? "bg-red-100 text-red-600"
                  : color.includes("yellow")
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {pillar.percentage}%
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-8 mt-6">
      <h2 className="text-xl font-semibold mb-6">
        Framework 3: Prioriteiten Overzicht
      </h2>

      {renderGroup("Kritiek (< 50%)", "border-red-200", "bg-red-50", grouped.kritiek)}
      {renderGroup("Verbetering (50–75%)", "border-yellow-200", "bg-yellow-50", grouped.verbetering)}
      {renderGroup("Goed (80%+)", "border-green-200", "bg-green-50", grouped.goed)}
    </div>
  );
};

export default Framework3;


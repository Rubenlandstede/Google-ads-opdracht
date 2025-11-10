import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Framework1 = ({
  pillars,
  scores,
  expandedPillars,
  togglePillar,
  updateScore,
  updateContext,
  context,
}) => {
  // Bereken score per pilaar
  const calculatePillarScore = (pillar) => {
    const subScores = Object.values(scores[pillar.key]);
    const total = subScores.reduce((a, b) => a + b, 0);
    const max = subScores.length; // elke sub = max 1
    const percentage = (total / max) * 100;
    return { total, max, percentage };
  };

  // Kleur op basis van score %
  const getColor = (percent) => {
    if (percent < 40) return "#EF4444"; // rood
    if (percent < 70) return "#F59E0B"; // geel
    return "#22C55E"; // groen
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
      <h2 className="text-lg font-semibold mb-6">
        Framework 1: Uitgebreide Score Cards
      </h2>

      {pillars.map((pillar) => {
        const { total, max, percentage } = calculatePillarScore(pillar);
        const barColor = getColor(percentage);

        return (
          <div
            key={pillar.key}
            className="mb-4 border rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div
              className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
              onClick={() => togglePillar(pillar.key)}
              style={{ borderLeft: `5px solid ${pillar.color}` }}
            >
              <div className="flex items-center gap-2">
                <pillar.icon className="text-gray-700" size={18} />
                <span className="font-medium">{pillar.name}</span>
              </div>

              <div className="flex items-center gap-4">
                {/* Score rechts */}
                <div className="text-sm font-semibold text-gray-700">
                  {total.toFixed(1)}/{max}{" "}
                  <span className="text-gray-400">
                    ({Math.round(percentage)}%)
                  </span>
                </div>
                {expandedPillars[pillar.key] ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
            </div>

            {/* Body met vragen */}
            {expandedPillars[pillar.key] && (
              <div className="p-4 bg-white border-t space-y-4">
                {pillar.subcriteria.map((sub) => (
                  <div key={sub.key} className="border rounded-lg p-4">
                    <div className="font-medium">{sub.name}</div>
                    <div className="text-sm text-gray-500 mb-2">
                      {sub.description}
                    </div>

                    <div className="flex flex-col gap-3">
                      <select
                        value={scores[pillar.key][sub.key]}
                        onChange={(e) =>
                          updateScore(
                            pillar.key,
                            sub.key,
                            parseFloat(e.target.value)
                          )
                        }
                        className="border rounded-lg px-3 py-1"
                      >
                        <option value={1}>Goed</option>
                        <option value={0.5}>Matig</option>
                        <option value={0}>Slecht</option>
                      </select>

                      <textarea
                        placeholder="Voeg context of notities toe..."
                        value={context[`${pillar.key}_${sub.key}`] || ""}
                        onChange={(e) =>
                          updateContext(pillar.key, sub.key, e.target.value)
                        }
                        className="border rounded-lg flex-1 px-3 py-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Score bar onderaan elke pilaar */}
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%`, backgroundColor: barColor }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Framework1;

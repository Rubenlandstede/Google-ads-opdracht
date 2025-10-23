import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { calculatePercentage } from "./helpers.jsx";

const TopDashboard = ({ percentage, totalScore, pillars, scores }) => {
  // Data per framework/pillar voorbereiden
  const data = pillars.map((pillar) => {
    const pillarPercentage = calculatePercentage(
      { [pillar.key]: scores[pillar.key] },
      [pillar]
    );
    return {
      name: pillar.name,
      value: pillarPercentage,
      color: pillar.color,
    };
  });

  // Totaal aantal vragen berekenen
  const totalQuestions = pillars.reduce(
    (sum, p) => sum + p.subcriteria.length,
    0
  );

  return (
    <div className="w-full flex flex-col items-center bg-[#f5f8ff] py-10 px-6 rounded-2xl shadow-sm mb-10">
      {/* Titel */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">
        Google Ads Audit Dashboard
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Uitgebreide analyse van de 6 hoofdpijlers met subcriteria
      </p>

      {/* Witte kaart */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center w-full">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Overall Performance
        </h3>

        {/* Donut + tekst */}
        <div className="relative flex justify-center items-center mb-4">
          <PieChart width={220} height={220}>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>

          {/* Tekst in het midden */}
          <div className="absolute text-center">
            <div
              className={`text-3xl font-bold ${
                percentage < 40
                  ? "text-red-500"
                  : percentage < 70
                  ? "text-orange-500"
                  : "text-green-500"
              }`}
            >
              {Math.round(percentage)}%
            </div>
            <div className="text-sm text-gray-500">Performance</div>
            <div className="text-sm text-gray-600">
              {totalScore.toFixed(1)} / {totalQuestions}
            </div>
          </div>
        </div>

        {/* Status label (optioneel visueel) */}
        <div
          className={`px-4 py-2 rounded-lg text-sm font-medium mb-4 ${
            percentage < 40
              ? "bg-red-100 text-red-600"
              : percentage < 70
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {percentage < 40
            ? "Zwak"
            : percentage < 70
            ? "Matig"
            : "Goed"}
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap justify-center gap-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-sm">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDashboard;


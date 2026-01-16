import React from "react";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";
import html2pdf from "html2pdf.js";
import "./styles.css";
import { addCustomerData } from "../../firestoreFunctions";







const PdfPage = () => {
  const location = useLocation();
  const state = location.state;
  

  const pdfRef = React.useRef();

  const downloadPdf = () => {
    const element = pdfRef.current;
    if (!element) return;

     const button = element.querySelector(".pdf-button");
  if (button) button.style.display = "none";

   const options = {
  margin: 10,               
  filename: "GoogleAdsAudit.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 2, useCORS: true }, // hogere resolutie
  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
};

html2pdf().from(pdfRef.current).set(options).save();
  };

  const goBack = () => navigate(-1);


  if (!state) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-xl">
        ⚠️ Geen data gevonden
      </div>
    );
  }

  const { scores, pillars, context, totalScore, percentage } = state;

  // Groeperen van subcriteria
  const grouped = { goed: [], matig: [], slecht: [] };

  pillars.forEach((pillar) => {
    pillar.subcriteria.forEach((sub) => {
      const score = scores[pillar.key]?.[sub.key];
      const note =
        context[`${pillar.key}_${sub.key}`] || "Geen opmerking ingevuld";

      if (score === undefined) return;

      let status = "matig";
      if (score === 1) status = "goed";
      else if (score === 0) status = "slecht";

      grouped[status].push({
        pillarName: pillar.name,
        subName: sub.name,
        percentage: Math.round(score * 100),
        note,
      });
    });
  });

 const renderGroup = (title, items, status) => {
  if (items.length === 0) return null;

  // Achtergrondkleur voor de hele groep
  const groupBgClass =
    status === "goed"
      ? "bg-green-100"
      : status === "matig"
      ? "bg-yellow-100"
      : "bg-red-100";

  return (
    <div className={`mb-8 p-5 rounded-xl ${groupBgClass}`}> {/* achtergrond hier */}
      <h4 className="font-semibold text-lg mb-4">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl shadow-sm bg-white"> {/* witte boxjes voor subcriteria */}
            <div className="flex justify-between mb-1">
              <p className="font-medium">{item.subName}</p>
              <span className="font-semibold">{item.percentage}%</span>
            </div>
            <p className="text-gray-800 text-sm whitespace-pre-wrap">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


  const totalQuestions = pillars.reduce(
    (sum, p) => sum + (p.subcriteria?.length || 0),
    0
  );

  

  return (
  <div ref={pdfRef} className="pdf-page min-h-screen bg-[#f5f8ff] py-10 px-6 flex flex-col items-center">

     <img 
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAxRz12LQZcG32COgwPqxc8aLMcBZWYgW_gw&s" 
    alt="Logo" 
    style={{ width: "150px", marginBottom: "20px" }} 
  />
  {/* Titel */}
  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
    Google Ads Audit PDF Samenvatting
  </h2>
  <p className="text-gray-500 text-sm mb-6">
    Overzicht van alle ingevulde bevindingen
  </p>

  {/* Score-kaart (TopDashboard-stijl) */}
  <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center w-full max-w-5xl mb-10">
    <h3 className="text-lg font-medium text-gray-700 mb-3">Overzicht Performance</h3>
    <div className="relative flex justify-center items-center mb-4 w-56 h-56">
      <PieChart width={220} height={220}>
        <Pie
          data={pillars.map((pillar) => ({
            name: pillar.name,
            value: Math.round(
              (pillar.subcriteria.reduce(
                (sum, sub) => sum + (scores[pillar.key]?.[sub.key] || 0),
                0
              ) / pillar.subcriteria.length) * 100
            ),
            color: pillar.color,
          }))}
          dataKey="value"
          innerRadius={70}
          outerRadius={100}
          startAngle={90}
          endAngle={-270}
          stroke="none"
        >
          {pillars.map((pillar, index) => (
            <Cell key={index} fill={pillar.color} />
          ))}
        </Pie>
      </PieChart>

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

    <div
      className={`px-4 py-2 rounded-lg text-sm font-medium mb-4 ${
        percentage < 40
          ? "bg-red-100 text-red-600"
          : percentage < 70
          ? "bg-yellow-100 text-yellow-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {percentage < 40 ? "Zwak" : percentage < 70 ? "Matig" : "Goed"}
    </div>

    <div className="flex flex-wrap justify-center gap-3">
      {pillars.map((pillar) => (
        <div key={pillar.name} className="flex items-center gap-2 text-sm">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: pillar.color }}
          ></span>
          <span className="text-gray-600">{pillar.name}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Framework 2  */}
  <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center w-full max-w-5xl mb-10"
    style={{ pageBreakBefore: "always", pageBreakInside: "avoid" }}>
    <h3 className="text-lg font-medium text-gray-700 mb-4">
      Framework 2: Voortgang per Pijler
    </h3>
    <div className="flex flex-wrap justify-center gap-6 w-full">
      {pillars.map((pillar) => {
        const pillarScores = scores[pillar.key] || {};
        const total = pillar.subcriteria.length;
        const achieved = Object.values(pillarScores).reduce((a, b) => a + b, 0);
        const percent = total ? (achieved / total) * 100 : 0;

        let labelText = "Goed";
        let labelColor = "bg-green-100 text-green-500";
        if (percent < 40) {
          labelText = "Kritiek";
          labelColor = "bg-red-100 text-red-500";
        } else if (percent < 70) {
          labelText = "Matig";
          labelColor = "bg-orange-100 text-orange-500";
        }

        return (
          <div key={pillar.key} className="flex flex-col items-center w-[120px]">
            <div className="flex flex-col items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{pillar.name}</span>
            </div>
            <div className="relative h-40 w-6 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div
                className="absolute bottom-0 left-0 w-full rounded-full transition-all duration-700"
                style={{ height: `${percent}%`, backgroundColor: pillar.color }}
              />
            </div>
            <div className={`text-sm font-semibold ${labelColor.split(" ")[1]}`}>
              {Math.round(percent)}%
            </div>
            <div className="text-xs text-gray-500">{achieved.toFixed(1)} / {total}</div>
            <div className={`text-xs mt-1 px-2 py-0.5 rounded-md font-medium ${labelColor}`}>
              {labelText}
            </div>
          </div>
        );
      })}
    </div>
    <div className="flex justify-center items-center gap-4 mt-6 text-xs text-gray-600">
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 bg-red-400 rounded-sm"></span>0–40% Kritiek
      </div>
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 bg-orange-400 rounded-sm"></span>40–60% Matig
      </div>
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 bg-green-400 rounded-sm"></span>60–80% Goed
      </div>
      <div className="flex items-center gap-1">
        <span className="w-3 h-3 bg-emerald-500 rounded-sm"></span>80–100% Uitstekend
      </div>
    </div>
  </div>

  {/* Framework 3 Samenvatting */}
<div
  className="bg-white rounded-2xl shadow-md p-6 w-full max-w-5xl mt-6 framework3-scale"
  style={{ pageBreakBefore: "always", pageBreakInside: "avoid"}}
>
  <h3 className="text-xl font-semibold text-gray-800 mb-6">Framework 3 Samenvatting</h3>

  {renderGroup("Goed (80–100%)", grouped.goed, "goed")}
  {renderGroup("Matig (50–79%)", grouped.matig, "matig")}
  {renderGroup("Slecht (0–49%)", grouped.slecht, "slecht")}

  {grouped.goed.length === 0 &&
    grouped.matig.length === 0 &&
    grouped.slecht.length === 0 && (
      <p className="text-gray-500 italic">
        Geen data gevonden voor Framework 3.
      </p>
  )}
   

  {/* Download PDF knop */}
  <button
    onClick={downloadPdf}
    className="mt-10 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md pdf-button"
  >
    Download PDF
  </button>
</div>

<button
  onClick={async () => {
    try {
      await addCustomerData(state.customerId, {
        scores,
        pillars,
        context,
        totalScore,
        percentage,
      });
      alert("Data opgeslagen voor deze klant!");
    } catch (error) {
      console.error(error);
      alert("Opslaan mislukt");
    }
  }}
  className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md"
>
  Opslaan in database
</button>




</div>





);




};



export default PdfPage;










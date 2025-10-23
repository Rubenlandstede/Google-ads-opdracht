export const generatePDF = (scores, pillars) => {
  const total = pillars.reduce(
    (sum, p) => sum + Object.values(scores[p.key] || {}).reduce((s, v) => s + v, 0),
    0
  );
  const max = pillars.reduce((s, p) => s + (p.maxPoints || 0), 0);
  const percent = ((total / max) * 100).toFixed(1);

  const html = `
  <html>
  <head>
    <title>Google Ads Audit Report</title>
  </head>
  <body style="font-family: Arial; margin: 40px;">
    <h1>Google Ads Audit Report</h1>
    <p>Totale score: ${total.toFixed(1)} / ${max}</p>
    <p>Performance: ${percent}%</p>
    <p>Datum: ${new Date().toLocaleDateString("nl-NL")}</p>
  </body>
  </html>
  `;

  const newWindow = window.open("", "_blank");
  newWindow.document.write(html);
  newWindow.document.close();
};

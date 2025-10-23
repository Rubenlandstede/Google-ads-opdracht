import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export const getScoreColor = (score) => {
  if (score >= 0.8) return "text-green-600";
  if (score >= 0.5) return "text-yellow-600";
  return "text-red-600";
};

export const getScoreIcon = (score) => {
  if (score >= 0.8) return <CheckCircle className="text-green-600" />;
  if (score >= 0.5) return <AlertTriangle className="text-yellow-600" />;
  return <XCircle className="text-red-600" />;
};

export const getScoreLabel = (score) => {
  if (score === 1) return "Goed";
  if (score === 0.5) return "Matig";
  return "Slecht";
};

export const calculateTotalScore = (scores, pillars) =>
  pillars.reduce(
    (sum, p) => sum + Object.values(scores[p.key] || {}).reduce((s, v) => s + v, 0),
    0
  );

export const calculatePercentage = (scores, pillars) => {
  const total = calculateTotalScore(scores, pillars);
  const max = pillars.reduce((s, p) => s + (p.maxPoints || 0), 0);
  return (total / max) * 100;
};

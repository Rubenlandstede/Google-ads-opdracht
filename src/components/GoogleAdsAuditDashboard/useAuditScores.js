import { useState } from "react";

export const useAuditScores = (initialScores) => {
  const [scores, setScores] = useState(initialScores);
  const [context, setContext] = useState({});

  const updateScore = (pillar, subcriterion, score) =>
    setScores((prev) => ({
      ...prev,
      [pillar]: { ...prev[pillar], [subcriterion]: score },
    }));

  const updateContext = (pillar, subcriterion, text) =>
    setContext((prev) => ({
      ...prev,
      [`${pillar}_${subcriterion}`]: text,
    }));

  return { scores, updateScore, context, updateContext };
};

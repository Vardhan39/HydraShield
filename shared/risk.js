function classifyRisk(stabilityScore) {
  if (stabilityScore > 7) return "Safe";
  if (stabilityScore >= 4) return "Moderate Risk";
  return "High Risk";
}

function classifyHydroRiskFromSnapshot({ speed = 0, water = 0 } = {}) {
  const combined = water * 0.7 + speed * 0.3;

  if (combined < 3) return "Low";
  if (combined < 6) return "Medium";
  return "High";
}

function recommendationForRiskLevel(riskLevel) {
  if (riskLevel === "High Risk") return "Reduce speed immediately";
  if (riskLevel === "Moderate Risk") return "Drive cautiously";
  return "Driving conditions stable";
}

module.exports = {
  classifyRisk,
  classifyHydroRiskFromSnapshot,
  recommendationForRiskLevel,
};


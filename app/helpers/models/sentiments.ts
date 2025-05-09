import { SentimentData } from "@/app/types/db/sentiment";

export const getScoreColor = (sentiment: SentimentData) => {
  if (sentiment.score >= 0.7) return "text-emerald-500";
  if (sentiment.score >= 0.4) return "text-blue-500";
  return "text-rose-500";
};

export const getLabelColor = (label: string) => {
  switch (label) {
    case "positive":
    case "satisfied":
    case "appreciative":
      return "bg-emerald-100 text-emerald-800";
    case "neutral":
      return "bg-blue-100 text-blue-800";
    case "negative":
    case "frustrated":
      return "bg-rose-100 text-rose-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

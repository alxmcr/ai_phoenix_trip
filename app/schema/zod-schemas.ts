import { z } from "zod";

// Sentiment schema
export const sentimentSchema = z.object({
  score: z.number().min(-1).max(1),
  label: z.enum(["Positive", "Negative", "Neutral"]),
  summary: z.string().min(10),
  emotion_tone: z.string().min(3),
});

// Actionable schema
export const actionableSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  priority: z.enum(["Low", "Medium", "High"]),
  department: z.string().min(3),
  category: z.string().min(3),
  source_aspect: z.string().min(3),
});

// Recommendation schema
export const recommendationSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  impact: z.enum(["Low", "Medium", "High"]),
  target_area: z.string().min(3),
  effort_level: z.enum(["Low", "Medium", "High"]),
  data_driven: z.boolean(),
});

// OpenAI Response schema
export const openAIResponseSchema = z.object({
  sentiment: sentimentSchema,
  actionables: z.array(actionableSchema).min(4).max(6),
  recommendations: z.array(recommendationSchema).min(2).max(3),
});

// Type inference
export type OpenAIResponseSchema = z.infer<typeof openAIResponseSchema>;
import { OpenAIMessageRoles } from "@/app/enums/openai/openai-message-roles";

// OpenAI API Response Types
export interface OpenAIMessage {
  role: OpenAIMessageRoles;
  content: string;
}

export interface OpenAIResponse {
  id: string;
  model: string;
  object: string;
  created: number;
  choices: {
    index: number;
    message: OpenAIMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Travel Review Analysis Response Types
export interface ResponseOpenAITravelReviewAnalysis {
  sentiment: OpenAISentiment;
  actionables: OpenAIActionable[];
  recommendations: OpenAIRecommendation[];
}

export interface OpenAISentiment {
  score: number;
  label: string;
  summary: string;
  emotion_tone: string;
}

export interface OpenAIActionable {
  title: string;
  description: string;
  priority: string;
  department: string;
  category: string;
  source_aspect: string;
}

export interface OpenAIRecommendation {
  title: string;
  description: string;
  impact: string;
  target_area: string;
  effort_level: string;
  data_driven: boolean;
}

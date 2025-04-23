// OpenAI Models
// Sources:
// - https://platform.openai.com/docs/models
// - https://model-spec.openai.com/2025-02-12.html#model_reference

// Enum for OpenAI models:
// Cost-optimized models, and structured outputs supported
// Smaller, faster models that cost less to run.
// - gpt-4o-mini
// - gpt-3.5-turbo
// - gpt-4.1-nano-2025-04-14

// Enum for OpenAI models:
// Older, but greater quality models
// Smaller, faster models that cost less to run.
// - gpt-4o

export enum OpenAIModels {
  GPT_4_O_MINI = "gpt-4o-mini",
  GPT_3_5_TURBO = "gpt-3.5-turbo",
  GPT_4_1_NANO = "gpt-4.1-nano-2025-04-14",
  GPT_4_O = "gpt-4o",
}

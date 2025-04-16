// OpenAI Models
// Sources:
// - https://platform.openai.com/docs/models
// - https://model-spec.openai.com/2025-02-12.html#model_reference

// Enum for OpenAI models:
// Cost-optimized models
// Smaller, faster models that cost less to run.
export enum OpenAIModelsCostOptimized {
  GPT_4_O_MINI = "gpt-4o-mini",
  GPT_3_5_TURBO = "gpt-3.5-turbo",
  GPT_4_1_NANO = "gpt-4.1-nano-2025-04-14",
}

// Enum for OpenAI models:
// Older, but greater quality models
// Smaller, faster models that cost less to run.
export enum OpenAIModelsOlder {
  GPT_4_O = "gpt-4o",
}

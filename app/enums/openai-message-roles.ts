// Enum for OpenAI message roles
// Sources:
// - https://model-spec.openai.com/2025-02-12.html#chain_of_command
// - https://model-spec.openai.com/2025-02-12.html#levels_of_authority

// System: The system message is used to provide instructions to the model.
// User: The user message is used to provide the input to the model.
// Assistant: The assistant message is used to provide the output from the model.

export enum OpenAIMessageRoles {
  SYSTEM = "system",
  USER = "user",
  ASSISTANT = "assistant",
}

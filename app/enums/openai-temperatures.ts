// Enum for OpenAI temperatures for create a model response
// Source: https://platform.openai.com/docs/api-reference/responses/create
export enum OpenAITemperatures {
  // add comments for each temperature
  // 0 is the most deterministic, 2 is the most random
  // 0.5 is the default
  // add all the temperatures from 0 to 2, but with best names like deterministic, random, etc.
  BALANCED_CREATIVE = 0.5,
  DETERMINISTIC_CREATIVE = 0.7,
  RANDOM_CREATIVE = 1.0,
  VERY_DETERMINISTIC_CREATIVE = 1.3,
  VERY_RANDOM_CREATIVE = 1.5,
  EXTREMELY_DETERMINISTIC_CREATIVE = 1.7,
  EXTREMELY_RANDOM_CREATIVE = 2.0,
}

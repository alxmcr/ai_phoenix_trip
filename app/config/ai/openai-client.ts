import { getOpenAIApiKey } from "@/envConfig";
import { OpenAI } from "openai";

const openai_key = getOpenAIApiKey();

if (!openai_key) {
  throw new Error("OpenAI API key is not set");
}

export const openai = new OpenAI({
  apiKey: openai_key,
});

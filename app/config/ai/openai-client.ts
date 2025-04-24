import "@/envConfig.ts";
import { OpenAI } from "openai";

const env = process.env.NODE_ENV || "development";

const isProduction = env === "production";

const openai_key = isProduction
  ? process.env.OPENAI_API_KEY
  : process.env.OPENAI_API_KEY_DEV;

if (!openai_key) {
  throw new Error("OPENAI_API_KEY is not set");
}

export const openai = new OpenAI({
  apiKey: openai_key,
});

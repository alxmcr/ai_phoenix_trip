// This file is used to ensure environment variables are loaded
// The actual environment variables are handled by Next.js automatically
// No need to explicitly load them here

import { config } from "dotenv";

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env.local';

config({ path: envFile });

interface EnvVariables {
  // OpenAI Configuration
  OPENAI_API_KEY?: string;
  LOCAL_OPENAI_API_KEY?: string;

  // Database Configuration
  DATABASE_URL?: string;
  LOCAL_CONN_STRING_DB?: string;

  // Environment
  NODE_ENV?: string;
  NEXT_PUBLIC_API_URL?: string;
}

// Export environment variables
export const env: EnvVariables = {
  // OpenAI
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  LOCAL_OPENAI_API_KEY: process.env.LOCAL_OPENAI_API_KEY,

  // Database
  DATABASE_URL: process.env.DATABASE_URL,
  LOCAL_CONN_STRING_DB: process.env.LOCAL_CONN_STRING_DB,

  // Environment
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
};

// Helper functions to get environment variables
export const getOpenAIApiKey = () => {
  return process.env.NODE_ENV === 'production'
    ? process.env.OPENAI_API_KEY
    : process.env.LOCAL_OPENAI_API_KEY;
};

export const getDatabaseConnectionString = () => {
  return process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.LOCAL_CONN_STRING_DB;
};

// Only log in development
if (process.env.NODE_ENV !== 'production') {
  console.log("�� ~ env:", env);
}

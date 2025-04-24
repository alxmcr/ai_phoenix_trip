import "@/envConfig.ts";
import postgres from "postgres";

const env = process.env.NODE_ENV || "development";

const isProduction = env === "production";

const connectionString = isProduction
  ? process.env.NEON_DATABASE_URL
  : process.env.LOCAL_DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = postgres(connectionString, {
  connection: {
    application_name: 'phoenix-trip',
    statement_timeout: 10000, // 10 seconds in milliseconds
  },
});

export default sql;

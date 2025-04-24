import "@/envConfig.ts";
import postgres from "postgres";

const env = process.env.NODE_ENV || "development";

const isProduction = env === "production";

const connectionString = isProduction
  ? process.env.NEON_DATABASE_URL
  : process.env.SUPABASE_DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = postgres(connectionString, {
  max: 1, // Maximum number of connections in the pool
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 10, // Connection timeout in seconds
  max_lifetime: 60 * 30, // Maximum lifetime of a connection in seconds (30 minutes)
});

export default sql;

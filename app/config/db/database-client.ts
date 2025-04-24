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
  idle_timeout: 5, // Close idle connections after 5 seconds
  connect_timeout: 8, // Connection timeout in seconds (keeping it under 10s)
  max_lifetime: 60 * 5, // Maximum lifetime of a connection in seconds (5 minutes)
  // Add connection pooling options
  prepare: false, // Disable prepared statements to reduce overhead
  ssl: isProduction ? 'require' : 'prefer', // Require SSL in production
  keep_alive: 5, // Keep connection alive for 5 seconds
});

export default sql;

import './envConfig.ts'
import postgres from 'postgres';

const env = process.env.NODE_ENV || 'development';

const isProduction = env === 'production';
console.log("\n\n🚀 ~ isProduction:", isProduction)

const connectionString = isProduction
  ? process.env.NEON_DATABASE_URL
  : process.env.SUPABASE_DATABASE_URL;

console.log("🚀 ~ connectionString:", connectionString)

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = postgres(connectionString);
export default sql;

import { getDatabaseConnectionString } from "@/envConfig";
import postgres from "postgres";

const connectionString = getDatabaseConnectionString();

if (!connectionString) {
  throw new Error("Database connection string is not set");
}

const sql = postgres(connectionString, {
  connection: {
    application_name: 'phoenix-trip',
    statement_timeout: 10000, // 10 seconds in milliseconds
  },
});

export default sql;

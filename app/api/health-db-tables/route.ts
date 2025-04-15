import "@/envConfig.ts";
import sql from "@/app/lib/db/database-client";
const env = process.env.NODE_ENV || "development";

export async function GET() {
  const initialResponse = {
    status: 200,
    headers: { "Content-Type": "application/json" },
  };

  try {
    // Query to get all tables from the public schema
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;

    const response = {
      env,
      status: "healthy",
      database: "connected",
      tables: tables.map(row => row.table_name)
    };

    // return a json response
    return new Response(JSON.stringify(response), initialResponse);
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ECONNREFUSED"
    ) {
      // response
      const response = {
        env,
        status: "unhealthy",
        database: "connection_refused",
        error:
          "Database connection refused. Please check if the database server is running and accessible.",
      };

      // return a json response
      return new Response(JSON.stringify(response), initialResponse);
    }

    // response
    const response = {
      env,
      status: "unhealthy",
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
    };

    // return a json response
    return new Response(JSON.stringify(response));
  }
}

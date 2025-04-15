import "@/envConfig.ts";
import sql from "@/app/lib/db/database-client";
const env = process.env.NODE_ENV || "development";

export async function GET() {
  const initialResponse = {
    status: 200,
    headers: { "Content-Type": "application/json" },
  };

  try {
    // Test the database connection by executing a simple query
    await sql`SELECT 1`;

    const response = {
      env,
      status: "healthy",
      database: "connected",
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

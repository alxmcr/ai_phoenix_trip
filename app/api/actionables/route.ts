// POST request: create an actionable

import { ActionableDB } from "@/app/classes/db/actionable-db";
import { HTTPResponseCode } from "@/app/enums/http-response-code";

const dbActionable = new ActionableDB();

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();

  try {
    //Insert new actionable into your DB
    const newActionable = dbActionable.create(body);

    // check if newAction is not null or undefined
    if (!newActionable) {
      return new Response(
        JSON.stringify({ error: "Failed to create actionable" }),
        {
          status: HTTPResponseCode.BAD_REQUEST,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Return the new actionable
    return new Response(JSON.stringify(newActionable), {
      status: HTTPResponseCode.CREATED,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err instanceof Error) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: HTTPResponseCode.BAD_REQUEST,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: "An unknown error occurred" }),
      {
        status: HTTPResponseCode.INTERNAL_SERVER_ERROR,
      }
    );
  }
}

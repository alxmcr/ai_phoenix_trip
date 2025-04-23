// POST request: create an Recommendation

import { RecommendationDB } from "@/app/classes/db/recommendation-db";
import { HTTPResponseCode } from "@/app/enums/api/http-response-code";

const dbRecommendation = new RecommendationDB();

export async function GET(request: Request) {
  // get the page and limit from the request
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const Recommendations = await dbRecommendation.paginate(page, limit);

  return new Response(JSON.stringify(Recommendations), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();

  try {
    //Insert new Recommendation into your DB
    const newRecommendation = await dbRecommendation.insert(body);

    // check if newAction is not null or undefined
    if (!newRecommendation) {
      return new Response(
        JSON.stringify({ error: "Failed to create Recommendation" }),
        {
          status: HTTPResponseCode.BAD_REQUEST,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Return the new Recommendation
    return new Response(JSON.stringify(newRecommendation), {
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

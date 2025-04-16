import { ReviewDB } from "@/app/classes/db/review-db";
import { ManagerOpenAI } from "@/app/classes/open-ai/manager-open-ai";
import { HTTPResponseCode } from "@/app/enums/http-response-code";
import { validate as validateUUID } from "uuid";

const dbReview = new ReviewDB();

export async function GET(request: Request) {
  // get the page and limit from the request
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const Reviews = await dbReview.paginate(page, limit);

  return new Response(JSON.stringify(Reviews), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();

  try {
    //Insert new Review into your DB
    const newReview = await dbReview.create(body);

    // check if newAction is not null or undefined
    if (!newReview) {
      return new Response(
        JSON.stringify({ error: "Failed to create Review" }),
        {
          status: HTTPResponseCode.BAD_REQUEST,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate UUID
    const reviewId = newReview.review_id;

    if (!validateUUID(reviewId)) {
      return new Response(JSON.stringify({ error: "Invalid UUID format" }), {
        status: HTTPResponseCode.BAD_REQUEST,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Analyze the review with OpenAI
    const reviewAIResponse = await ManagerOpenAI.analyzeReview(newReview);

    // Return the new Review
    return new Response(JSON.stringify(reviewAIResponse), {
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

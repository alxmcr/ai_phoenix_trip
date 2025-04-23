import { ReviewDB } from "@/app/classes/db/review-db";
import { HTTPResponseCode } from "@/app/enums/http-response-code";
import { NextRequest } from "next/server";
import { validate as validateUUID } from "uuid";

const dbReview = new ReviewDB();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Check if this is a paginated request
    const isPaginated = searchParams.has("page") || searchParams.has("pageSize");

    if (isPaginated) {
      // Handle paginated request
      const page = Number(searchParams.get("page")) || 1;
      const pageSize = Number(searchParams.get("pageSize")) || 6;
      const searchQuery = searchParams.get("search") || "";
      const transportFilter = searchParams.get("transport") || "all";

      // Get total count for pagination
      const totalCount = await dbReview.count();
      const totalPages = Math.ceil(totalCount / pageSize);

      // Get paginated reviews
      let reviews;
      if (searchQuery || transportFilter !== "all") {
        reviews = await dbReview.filter({
          company_name: searchQuery || undefined,
          transport_mode: transportFilter !== "all" ? transportFilter : undefined,
        });
      } else {
        reviews = await dbReview.paginate(page, pageSize);
      }

      return new Response(
        JSON.stringify({
          reviews,
          pagination: {
            currentPage: page,
            totalPages,
            totalItems: totalCount,
          },
        }),
        {
          status: HTTPResponseCode.OK,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // Handle regular request (get all reviews)
      const page = Number(searchParams.get("page")) || 1;
      const limit = Number(searchParams.get("limit")) || 10;

      const reviews = await dbReview.paginate(page, limit);

      return new Response(JSON.stringify(reviews), {
        status: HTTPResponseCode.OK,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error)
    return new Response(
      JSON.stringify({ error: "Failed to fetch reviews" }),
      {
        status: HTTPResponseCode.INTERNAL_SERVER_ERROR,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();

  try {
    //Insert new Review into your DB
    const newReview = await dbReview.insert(body);

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

    // Send the review to OpenAI for analysis
    // const reviewAIResponse = {}

    // Return response from OpenAI for the review
    return new Response(JSON.stringify(newReview), {
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

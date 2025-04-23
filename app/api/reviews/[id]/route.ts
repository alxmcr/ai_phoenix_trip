import { ActionableDB } from "@/app/classes/db/actionable-db";
import { RecommendationDB } from "@/app/classes/db/recommendation-db";
import { ReviewDB } from "@/app/classes/db/review-db";
import { SentimentDB } from "@/app/classes/db/sentiment-db";
import { HTTPResponseCode } from "@/app/enums/api/http-response-code";
import { ReviewAIResponse } from "@/app/types/ai/review-ai-response";
import { NextRequest } from "next/server";
import { validate as validateUUID } from "uuid";

// Helpers database
const dbReview = new ReviewDB();
const dbActionable = new ActionableDB();
const dbRecommendation = new RecommendationDB();
const dbSentiment = new SentimentDB();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  // Validate UUID
  if (!validateUUID(id)) {
    return new Response(JSON.stringify({ error: "Invalid UUID format" }), {
      status: HTTPResponseCode.BAD_REQUEST,
      headers: { "Content-Type": "application/json" },
    });
  }

  const rowReview = await dbReview.read(id);

  // If the Review is not found, return a 404 error
  if (!rowReview) {
    return new Response(JSON.stringify({ error: "Review not found" }), {
      status: HTTPResponseCode.NOT_FOUND,
      headers: { "Content-Type": "application/json" },
    });
  }

  // check that the review id is a valid uuid
  if (!validateUUID(rowReview.review_id)) {
    return new Response(JSON.stringify({ error: "Invalid UUID format" }), {
      status: HTTPResponseCode.BAD_REQUEST,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Filter sentiments by review id
  const sentiments = await dbSentiment.filter({
    review_id: rowReview.review_id,
  });

  // Filter actionables by review id
  const actionables = await dbActionable.filter({
    review_id: rowReview.review_id,
  });

  // Filter recommendations by review id
  const recommendations = await dbRecommendation.filter({
    review_id: rowReview.review_id,
  });

  // Build the response
  const response: ReviewAIResponse = {
    review: rowReview,
    actionables: actionables,
    sentiment: sentiments[0],
    recommendations: recommendations,
  };

  // If the Review is found, return the Review
  return new Response(JSON.stringify(response), {
    status: HTTPResponseCode.OK,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  // Validate UUID
  if (!validateUUID(id)) {
    return new Response(JSON.stringify({ error: "Invalid UUID format" }), {
      status: HTTPResponseCode.BAD_REQUEST,
      headers: { "Content-Type": "application/json" },
    });
  }

  const isDeleted = await dbReview.delete(id);

  // If the Review is not found, return a 404 error
  if (!isDeleted) {
    return new Response(JSON.stringify({ error: "Review not found" }), {
      status: HTTPResponseCode.NOT_FOUND,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If the Review is deleted, return a 204 no content
  return new Response(null, { status: HTTPResponseCode.NOT_CONTENT });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  // Validate UUID
  if (!validateUUID(id)) {
    return new Response(JSON.stringify({ error: "Invalid UUID format" }), {
      status: HTTPResponseCode.BAD_REQUEST,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json();

  const updatedReview = await dbReview.update(id, body);

  // If the Review is not found, return a 404 error
  if (!updatedReview) {
    return new Response(JSON.stringify({ error: "Review not found" }), {
      status: HTTPResponseCode.NOT_FOUND,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If the Review is deleted, return a 204 no content
  return new Response(JSON.stringify(updatedReview), {
    status: HTTPResponseCode.OK,
    headers: { "Content-Type": "application/json" },
  });
}

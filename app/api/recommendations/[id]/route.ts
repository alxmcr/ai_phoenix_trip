import { RecommendationDB } from "@/app/classes/db/recommendation-db";
import { NextRequest } from "next/server";
import { validate as validateUUID } from "uuid";
import { HTTPResponseCode } from "@/app/enums/api/http-response-code";

// Helper database
const dbRecommendation = new RecommendationDB();

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

  const rowRecommendation = await dbRecommendation.read(id);

  // If the Recommendation is not found, return a 404 error
  if (!rowRecommendation) {
    return new Response(JSON.stringify({ error: "Recommendation not found" }), {
      status: HTTPResponseCode.NOT_FOUND,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If the Recommendation is found, return the Recommendation
  return new Response(JSON.stringify(rowRecommendation), {
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

  const isDeleted = await dbRecommendation.delete(id);

  // If the Recommendation is not found, return a 404 error
  if (!isDeleted) {
    return new Response(JSON.stringify({ error: "Recommendation not found" }), {
      status: HTTPResponseCode.NOT_FOUND,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If the Recommendation is deleted, return a 204 no content
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

  const updatedRecommendation = await dbRecommendation.update(id, body);

  // If the Recommendation is not found, return a 404 error
  if (!updatedRecommendation) {
    return new Response(JSON.stringify({ error: "Recommendation not found" }), {
      status: HTTPResponseCode.NOT_FOUND,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If the Recommendation is deleted, return a 204 no content
  return new Response(JSON.stringify(updatedRecommendation), {
    status: HTTPResponseCode.OK,
    headers: { "Content-Type": "application/json" },
  });
}

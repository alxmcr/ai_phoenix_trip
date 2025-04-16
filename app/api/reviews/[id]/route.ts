import { ReviewDB } from "@/app/classes/db/review-db";
import { NextRequest } from "next/server";
import { validate as validateUUID } from "uuid";
import { HTTPResponseCode } from "@/app/enums/http-response-code";

// Helper database
const dbReview = new ReviewDB();

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

  // If the Review is found, return the Review
  return new Response(JSON.stringify(rowReview), {
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

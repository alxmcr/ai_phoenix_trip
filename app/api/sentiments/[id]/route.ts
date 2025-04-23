import { SentimentDB } from "@/app/classes/db/sentiment-db";
import { NextRequest } from "next/server";
import { validate as validateUUID } from "uuid";
import { HTTPResponseCode } from "@/app/enums/api/http-response-code";

// Helper database
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

  const rowSentiment = await dbSentiment.read(id);

  // If the Sentiment is not found, return a 404 error
  if (!rowSentiment) {
    return new Response(JSON.stringify({ error: "Sentiment not found" }), {
      status: HTTPResponseCode.NOT_FOUND,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If the Sentiment is found, return the Sentiment
  return new Response(JSON.stringify(rowSentiment), {
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

  const isDeleted = await dbSentiment.delete(id);

  // If the Sentiment is not found, return a 404 error
  if (!isDeleted) {
    return new Response(JSON.stringify({ error: "Sentiment not found" }), {
      status: HTTPResponseCode.NOT_FOUND,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If the Sentiment is deleted, return a 204 no content
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

  const updatedSentiment = await dbSentiment.update(id, body);

  // If the Sentiment is not found, return a 404 error
  if (!updatedSentiment) {
    return new Response(JSON.stringify({ error: "Sentiment not found" }), {
      status: HTTPResponseCode.NOT_FOUND,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If the Sentiment is deleted, return a 204 no content
  return new Response(JSON.stringify(updatedSentiment), {
    status: HTTPResponseCode.OK,
    headers: { "Content-Type": "application/json" },
  });
}

import { ActionableDB } from "@/app/classes/db/actionable-db";
import { NextRequest } from "next/server";
import { validate as validateUUID } from "uuid";
import { HTTPResponseCode } from "@/app/enums/http-response-code";

// Helper database
const dbActionable = new ActionableDB();

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

  const rowActionable = await dbActionable.read(id);

  // If the actionable is not found, return a 404 error
  if (!rowActionable) {
    return new Response(JSON.stringify({ error: "Actionable not found" }), {
      status: HTTPResponseCode.NOT_FOUND,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If the actionable is found, return the actionable
  return new Response(JSON.stringify(rowActionable), {
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

  const isDeleted = await dbActionable.delete(id);

  // If the actionable is not found, return a 404 error
  if (!isDeleted) {
    return new Response(JSON.stringify({ error: "Actionable not found" }), {
      status: HTTPResponseCode.NOT_FOUND,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If the actionable is deleted, return a 204 no content
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

  const updatedActionable = await dbActionable.update(id, body);

  // If the actionable is not found, return a 404 error
  if (!updatedActionable) {
    return new Response(JSON.stringify({ error: "Actionable not found" }), {
      status: HTTPResponseCode.NOT_FOUND,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If the actionable is deleted, return a 204 no content
  return new Response(JSON.stringify(updatedActionable), {
    status: HTTPResponseCode.OK,
    headers: { "Content-Type": "application/json" },
  });
}

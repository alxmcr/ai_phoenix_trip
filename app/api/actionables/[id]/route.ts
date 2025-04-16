import { ActionableDB } from "@/app/classes/db/actionable-db";
import { NextRequest } from "next/server";
import { validate as validateUUID } from 'uuid';
import { HTTPResponseCode } from "@/app/enums/http-response-code";

// Helper database
const actionableDb = new ActionableDB();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  // Validate UUID
  if (!validateUUID(id)) {
    return new Response(
      JSON.stringify({ error: "Invalid UUID format" }),
      {
        status: HTTPResponseCode.BAD_REQUEST,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const actionable = await actionableDb.read(id);

  // If the actionable is not found, return a 404 error
  if (!actionable) {
    return new Response(JSON.stringify({ error: "Actionable not found" }), {
      status: HTTPResponseCode.NOT_FOUND,
      headers: { "Content-Type": "application/json" },
    });
  }

  // If the actionable is found, return the actionable
  return new Response(JSON.stringify(actionable), {
    status: HTTPResponseCode.OK,
    headers: { "Content-Type": "application/json" },
  });
}

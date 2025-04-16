// POST request: create an Sentiment

import { SentimentDB } from "@/app/classes/db/sentiment-db";
import { HTTPResponseCode } from "@/app/enums/http-response-code";

const dbSentiment = new SentimentDB();

export async function GET(request: Request) {
  // get the page and limit from the request
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const listSentiments = await dbSentiment.paginate(page, limit);

  return new Response(JSON.stringify(listSentiments), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();

  try {
    //Insert new Sentiment into your DB
    const newSentiment = await dbSentiment.create(body);

    // check if newAction is not null or undefined
    if (!newSentiment) {
      return new Response(
        JSON.stringify({ error: "Failed to create Sentiment" }),
        {
          status: HTTPResponseCode.BAD_REQUEST,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Return the new Sentiment
    return new Response(JSON.stringify(newSentiment), {
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

import { SentimentData } from "@/app/types/db/sentiment";
import { validate as validateUUID } from "uuid";

export class ValidationSentiment {
  // Check all the fields are filled on Sentiment
  static validateSentiment(sentiment: SentimentData) {
    if (!sentiment) {
      throw new Error("Sentiment not found");
    }

    const emptyFields: string[] = [];

    // Check if the sentiment is valid
    if (!validateUUID(sentiment.sentiment_id)) {
      emptyFields.push("sentiment_id");
    }

    // Check if the review id is valid
    if (!validateUUID(sentiment.review_id)) {
      emptyFields.push("review_id");
    }

    // Check if sentiment text is valid
    if (!sentiment.sentiment_text) {
      emptyFields.push("sentiment_text");
    }

    if (emptyFields.length > 0) {
      throw new Error(`The following fields are empty: ${emptyFields.join(", ")}`);
    }

    return true;
  }
}

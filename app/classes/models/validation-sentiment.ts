import { SentimentData } from "@/app/types/db/sentiment";
import { validate as validateUUID } from "uuid";

export class ValidationSentiment {
  // Check all the fields are filled on Sentiment
  static validateSentiment(sentiment: SentimentData) {
    if (!sentiment) {
      throw new Error("Sentiment not found");
    }

    // Check if the sentiment is valid
    if (!validateUUID(sentiment.sentiment_id)) {
      throw new Error("Sentiment ID is not valid");
    }

    // Check if the review id is valid
    if (!validateUUID(sentiment.review_id)) {
      throw new Error("Review ID is not valid");
    }

    // Check if sentiment text is valid
    if (!sentiment.sentiment_text) {
      throw new Error("Sentiment text is not valid");
    }

    return true;
  }
}

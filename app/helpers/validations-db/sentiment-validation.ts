import { ValidationError } from "@/app/classes/errors/error-handler";
import { SentimentData } from "../../types/db/sentiment";

export function validateRequiredFields(
  sentiment: Partial<SentimentData>
): void {
  // check if the sentiment is empty
  if (Object.keys(sentiment).length === 0) {
    throw new ValidationError("sentiment data is required");
  }

  // check if the review_id is empty
  if (!sentiment.review_id) {
    throw new ValidationError("review_id is required");
  }

  // check if the score is empty
  if (sentiment.score === undefined) {
    throw new ValidationError("score is required");
  }

  // check if the emotion_tone is empty
  if (!sentiment.emotion_tone) {
    throw new ValidationError("emotion_tone is required");
  }

  // check if the label is empty
  if (!sentiment.label) {
    throw new ValidationError("label is required");
  }

  // check if the summary is empty
  if (!sentiment.summary) {
    throw new ValidationError("summary is required");
  }
}

export function validateFieldFormats(sentiment: Partial<SentimentData>): void {
  // check if score is valid
  if (
    sentiment.score !== undefined &&
    (sentiment.score < -1 || sentiment.score > 1)
  ) {
    throw new ValidationError("score must be between -1 and 1");
  }

  // check if emotion_tone is valid
  if (sentiment.emotion_tone && sentiment.emotion_tone.length < 3) {
    throw new ValidationError(
      "emotion_tone must be at least 3 characters long"
    );
  }

  // check if label is valid
  if (sentiment.label && sentiment.label.length < 3) {
    throw new ValidationError("label must be at least 3 characters long");
  }

  // check if summary is valid
  if (sentiment.summary && sentiment.summary.length < 10) {
    throw new ValidationError("summary must be at least 10 characters long");
  }
}

export function validateSentiment(
  sentiment: Partial<SentimentData>,
  requireAllFields = true
): void {
  if (requireAllFields) {
    validateRequiredFields(sentiment);
  }
  validateFieldFormats(sentiment);
}

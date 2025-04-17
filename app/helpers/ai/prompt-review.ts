import { ReviewData } from "@/app/types/db/review";

export function buildPromptReview(review: ReviewData) {
  // check if trip_date is valid
  const tripDate = new Date(review.trip_date);
  if (isNaN(tripDate.getTime())) {
    throw new Error("Invalid trip date");
  }

  // check if transport_mode is valid
  if (review.transport_mode.length < 3) {
    throw new Error("Invalid transport mode");
  }

  // check if company_name is valid
  if (review.company_name.length < 3) {
    throw new Error("Invalid company name");
  }

  // check if origin is valid
  if (review.origin.length < 3) {
    throw new Error("Invalid origin");
  }

  // check if destination is valid
  if (review.destination.length < 3) {
    throw new Error("Invalid destination");
  }

  // check if rating is valid
  if (review.rating < 1 || review.rating > 5) {
    throw new Error("Invalid rating");
  }

  // check if review_text is valid
  if (review.review_text.length < 10) {
    throw new Error("Invalid review text");
  }

  return `
      Analyze the following travel review and provide insights:

      - Trip Date: ${review.trip_date}
      - Transport Mode: ${review.transport_mode}
      - Company: ${review.company_name}
      - Route: From ${review.origin} to ${review.destination}
      - Rating: ${review.rating}/5
      - Review: "${review.review_text}"
  `;
}

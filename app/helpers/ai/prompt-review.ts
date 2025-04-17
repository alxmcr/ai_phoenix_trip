import { ReviewData } from "@/app/types/db/review";

export function buildPromptReview(review: ReviewData) {
  // check if age_group is valid
  if (review.age_group.length < 3) {
    throw new Error("Invalid age group");
  }

  // check if trip_type is valid
  if (review.trip_type.length < 3) {
    throw new Error("Invalid trip type");
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
  if (review.description.length < 10) {
    throw new Error("Invalid review text");
  }

  // check if start_date is valid
  if (review.start_date) {
    throw new Error("Invalid start date");
  }

  // check if end_date is valid
  if (review.end_date) {
    throw new Error("Invalid end date");
  }

  return `
      Analyze the following travel review and provide insights:

      - Age Group: ${review.age_group}
      - Trip Type: ${review.trip_type}
      - Transport Mode: ${review.transport_mode}
      - Company: ${review.company_name}
      - Rating: ${review.rating}/5
      - Route: From ${review.origin} to ${review.destination}
      - Travel dates: ${review.start_date} to ${review.end_date}.
      - Review: "${review.description}"
  `;
}

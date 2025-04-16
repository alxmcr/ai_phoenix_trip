import { ReviewData } from "@/app/types/db/review";

export function buildPromptReview(review: ReviewData) {
  return `
      Analyze the following travel review and provide insights:

      Trip Date: ${review.trip_date}
      Transport Mode: ${review.transport_mode}
      Company: ${review.company_name}
      Route: From ${review.origin} to ${review.destination}
      Rating: ${review.rating}/5
      Review: "${review.review_text}"
  `;
}

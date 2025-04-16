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

      Please analyze this review and return insights in **strict JSON format** with the following structure:

      1. **Sentiment analysis** — including:
        - score (float, from -1 to 1)
        - label ("positive", "neutral", or "negative")
        - summary (brief 1–2 sentence overview of sentiment)
        - emotion_tone (e.g. "frustration", "satisfaction", "disappointment", "joy")
        - aspect_sentiments (object showing sentiment score per aspect, e.g. { "punctuality": -0.9, "staff": -0.6 })
        - keywords (array of 2–5 key terms from the review)

      2. **Actionable insights** (2–3 items) — each with:
        - title
        - description
        - priority ("low", "medium", or "high")
        - department (e.g. "Customer Service", "Operations", "Cleaning", etc.)
        - category (e.g. "Service", "Communication", "Cleanliness", etc.)
        - source_aspect (the part of the review that triggered this insight)

      3. **Recommendations for improvement** (2–3 items) — each with:
        - title
        - description
        - impact ("low", "medium", or "high")
        - target_area (e.g. "Passenger Experience", "Onboard Cleanliness", etc.)
        - effort_level ("low", "medium", or "high")
        - data_driven (boolean indicating if it's based on clear review data)

      Return ONLY valid, minified JSON with the following structure:
      {
        "sentiment": {
          "score": number,
          "label": string,
          "summary": string,
          "emotion_tone": string,
          "aspect_sentiments": {
            "aspect": number
          },
          "keywords": [string]
        },
        "actionables": [
          {
            "title": string,
            "description": string,
            "priority": string,
            "department": string,
            "category": string,
            "source_aspect": string
          }
        ],
        "recommendations": [
          {
            "title": string,
            "description": string,
            "impact": string,
            "target_area": string,
            "effort_level": string,
            "data_driven": boolean
          }
        ]
      }
    `;
}

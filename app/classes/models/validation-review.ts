import { ReviewData } from "@/app/types/db/review";
import { validate as validateUUID } from "uuid";

export class ValidationReview {
  // Check all the fields are filled on Review
  static validateReview(review: ReviewData) {
    if (!review) {
      throw new Error("Review not found");
    }

    // Check if the review is valid
    if (!validateUUID(review.review_id)) {
      throw new Error("Review ID is not valid");
    }

    // Check if the trip date is valid
    if (!review.trip_date) {
      throw new Error("Trip date is not valid");
    }

    // Check if the transport mode is valid
    if (!review.transport_mode) {
      throw new Error("Transport mode is not valid");
    }

    // Check if the company name is valid
    if (!review.company_name) {
      throw new Error("Company name is not valid");
    }

    // Check if the origin is valid
    if (!review.origin) {
      throw new Error("Origin is not valid");
    }

    // Check if the destination is valid
    if (!review.destination) {
      throw new Error("Destination is not valid");
    }

    // Check if the email is valid
    if (!review.email) {
      throw new Error("Email is not valid");
    }

    // Check if the rating is valid
    if (!review.rating) {
      throw new Error("Rating is not valid");
    }

    // Check if the review text is valid
    if (!review.review_text) {
      throw new Error("Review text is not valid");
    }

    return true;
  }
}

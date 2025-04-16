import { ReviewData } from "@/app/types/db/review";
import { validate as validateUUID } from "uuid";

export class ValidationReview {
  // Check if the review is valid
  static validateReview(review: ReviewData) {
    if (!review) {
      throw new Error("Review not found");
    }

    // Check if the review is valid
    if (!validateUUID(review.review_id)) {
      throw new Error("Review ID is not valid");
    }

    return true;
  }

  // Check if the review is valid to be inserted
  static validateInsertReview(review: Partial<ReviewData>) {
    if (!review) {
      throw new Error("Review not found");
    }

    const emptyFields: string[] = [];

    // Check if the trip date is valid
    if (!review.trip_date) {
      emptyFields.push("trip_date");
    }

    // Check if the transport mode is valid
    if (!review.transport_mode) {
      emptyFields.push("transport_mode");
    }

    // Check if the company name is valid
    if (!review.company_name) {
      emptyFields.push("company_name");
    }

    // Check if the origin is valid
    if (!review.origin) {
      emptyFields.push("origin");
    }

    // Check if the destination is valid
    if (!review.destination) {
      emptyFields.push("destination");
    }

    // Check if the email is valid
    if (!review.email) {
      emptyFields.push("email");
    }

    // Check if the rating is valid
    if (!review.rating) {
      emptyFields.push("rating");
    }

    // Check if the review text is valid
    if (!review.review_text) {
      emptyFields.push("review_text");
    }

    if (emptyFields.length > 0) {
      throw new Error(`The following fields are empty: ${emptyFields.join(", ")}`);
    }

    return true;
  }
}

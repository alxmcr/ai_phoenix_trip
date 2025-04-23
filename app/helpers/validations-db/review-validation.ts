import { ValidationError } from "@/app/classes/errors/error-handler";
import { ReviewData } from "../../types/db/review";

export function validateRequiredFields(review: Partial<ReviewData>): void {
  // check if the review is empty
  if (Object.keys(review).length === 0) {
    throw new ValidationError("review data is required");
  }

  // check if the email is empty
  if (!review.email) {
    throw new ValidationError("email is required");
  }

  // check if the age_group is empty
  if (!review.age_group) {
    throw new ValidationError("age_group is required");
  }

  // check if the trip_type is empty
  if (!review.trip_type) {
    throw new ValidationError("trip_type is required");
  }

  // check if the description is empty
  if (!review.description) {
    throw new ValidationError("description is required");
  }

  // check if the transport_mode is empty
  if (!review.transport_mode) {
    throw new ValidationError("transport_mode is required");
  }

  // check if the rating is empty
  if (!review.rating) {
    throw new ValidationError("rating is required");
  }

  // check if the company_name is empty
  if (!review.company_name) {
    throw new ValidationError("company_name is required");
  }

  // check if the origin is empty
  if (!review.origin) {
    throw new ValidationError("origin is required");
  }

  // check if the destination is empty
  if (!review.destination) {
    throw new ValidationError("destination is required");
  }

  // check if the start_date is empty
  if (!review.start_date) {
    throw new ValidationError("start_date is required");
  }

  // check if the end_date is empty
  if (!review.end_date) {
    throw new ValidationError("end_date is required");
  }
}

export function validateFieldFormats(review: Partial<ReviewData>): void {
  // check if age_group is valid
  if (review.age_group && review.age_group.length < 3) {
    throw new ValidationError("age_group must be at least 3 characters long");
  }

  // check if trip_type is valid
  if (review.trip_type && review.trip_type.length < 3) {
    throw new ValidationError("trip_type must be at least 3 characters long");
  }

  // check if transport_mode is valid
  if (review.transport_mode && review.transport_mode.length < 3) {
    throw new ValidationError(
      "transport_mode must be at least 3 characters long"
    );
  }

  // check if company_name is valid
  if (review.company_name && review.company_name.length < 3) {
    throw new ValidationError(
      "company_name must be at least 3 characters long"
    );
  }

  // check if origin is valid
  if (review.origin && review.origin.length < 3) {
    throw new ValidationError("origin must be at least 3 characters long");
  }

  // check if destination is valid
  if (review.destination && review.destination.length < 3) {
    throw new ValidationError("destination must be at least 3 characters long");
  }

  // check if rating is valid
  if (review.rating && (review.rating < 1 || review.rating > 5)) {
    throw new ValidationError("rating must be between 1 and 5");
  }

  // check if description is valid
  if (review.description && review.description.length < 10) {
    throw new ValidationError(
      "description must be at least 10 characters long"
    );
  }
}

export function validateReview(
  review: Partial<ReviewData>,
  requireAllFields = true
): void {
  if (requireAllFields) {
    validateRequiredFields(review);
  }
  validateFieldFormats(review);
}

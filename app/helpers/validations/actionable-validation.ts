import { ValidationError } from "@/app/classes/errors/error-handler";
import { ActionableData } from "../../types/db/actionable";

export function validateRequiredFields(actionable: Partial<ActionableData>): void {
  // check if the actionable is empty
  if (Object.keys(actionable).length === 0) {
    throw new ValidationError("actionable data is required");
  }

  // check if the review_id is empty
  if (!actionable.review_id) {
    throw new ValidationError("review_id is required");
  }

  // check if the priority is empty
  if (!actionable.priority) {
    throw new ValidationError("priority is required");
  }

  // check if the department is empty
  if (!actionable.department) {
    throw new ValidationError("department is required");
  }

  // check if the category is empty
  if (!actionable.category) {
    throw new ValidationError("category is required");
  }

  // check if the source_aspect is empty
  if (!actionable.source_aspect) {
    throw new ValidationError("source_aspect is required");
  }

  // check if the title is empty
  if (!actionable.title) {
    throw new ValidationError("title is required");
  }

  // check if the description is empty
  if (!actionable.description) {
    throw new ValidationError("description is required");
  }
}

export function validateFieldFormats(actionable: Partial<ActionableData>): void {
  // check if priority is valid
  if (actionable.priority && actionable.priority.length < 3) {
    throw new ValidationError("priority must be at least 3 characters long");
  }

  // check if department is valid
  if (actionable.department && actionable.department.length < 3) {
    throw new ValidationError("department must be at least 3 characters long");
  }

  // check if category is valid
  if (actionable.category && actionable.category.length < 3) {
    throw new ValidationError("category must be at least 3 characters long");
  }

  // check if source_aspect is valid
  if (actionable.source_aspect && actionable.source_aspect.length < 3) {
    throw new ValidationError("source_aspect must be at least 3 characters long");
  }

  // check if title is valid
  if (actionable.title && actionable.title.length < 3) {
    throw new ValidationError("title must be at least 3 characters long");
  }

  // check if description is valid
  if (actionable.description && actionable.description.length < 10) {
    throw new ValidationError("description must be at least 10 characters long");
  }
}

export function validateActionable(actionable: Partial<ActionableData>, requireAllFields = true): void {
  if (requireAllFields) {
    validateRequiredFields(actionable);
  }
  validateFieldFormats(actionable);
}
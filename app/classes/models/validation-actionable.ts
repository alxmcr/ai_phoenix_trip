import { ActionableData } from "@/app/types/db/actionable";
import { validate as validateUUID } from "uuid";

export class ValidationActionable {
  // Check all the fields are filled on Actionable
  static validateActionable(actionable: ActionableData) {
    if (!actionable) {
      throw new Error("Actionable not found");
    }

    const emptyFields: string[] = [];

    // Check if the actionable is valid
    if (!validateUUID(actionable.actionable_id)) {
      emptyFields.push("actionable_id");
    }

    // Check if the review id is valid
    if (!validateUUID(actionable.review_id)) {
      emptyFields.push("review_id");
    }

    // Check if the actionable text is valid
    if (!actionable.action_text) {
      emptyFields.push("action_text");
    }

    if (emptyFields.length > 0) {
      throw new Error(`The following fields are empty: ${emptyFields.join(", ")}`);
    }

    return true;
  }
}

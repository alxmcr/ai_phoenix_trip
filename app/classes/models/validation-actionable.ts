import { ActionableData } from "@/app/types/db/actionable";
import { validate as validateUUID } from "uuid";

export class ValidationActionable {
  // Check all the fields are filled on Actionable
  static validateActionable(actionable: ActionableData) {
    if (!actionable) {
      throw new Error("Actionable not found");
    }

    // Check if the actionable is valid
    if (!validateUUID(actionable.actionable_id)) {
      throw new Error("Actionable ID is not valid");
    }

    // Check if the review id is valid
    if (!validateUUID(actionable.review_id)) {
      throw new Error("Review ID is not valid");
    }

    // Check if the actionable text is valid
    if (!actionable.action_text) {
      throw new Error("Actionable text is not valid");
    }

    return true;
  }
}

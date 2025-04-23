import { HTTPResponseCode } from "@/app/enums/api/http-response-code";
import { AppError } from "./error-app";

export class InvalidFilterError extends AppError {
  constructor(message: string) {
    super(HTTPResponseCode.BAD_REQUEST, message);
    this.name = "InvalidFilterError";
  }
}

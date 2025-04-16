import { HTTPResponseCode } from "@/app/enums/http-response-code";

export class AppError extends Error {
  constructor(
    public statusCode: HTTPResponseCode,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
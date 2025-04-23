import { HTTPResponseCode } from "@/app/enums/api/http-response-code";
import postgres from "postgres";

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

export class InvalidFilterError extends AppError {
  constructor(message: string) {
    super(HTTPResponseCode.BAD_REQUEST, message);
    this.name = 'InvalidFilterError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(HTTPResponseCode.BAD_REQUEST, message);
    this.name = 'ValidationError';
  }
}

export interface PostgresErrorWithConstraint extends postgres.PostgresError {
  constraint?: string;
}

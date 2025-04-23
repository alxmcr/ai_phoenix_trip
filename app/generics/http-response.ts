import { HTTPResponseCode } from "../enums/api/http-response-code";


export interface HTTPResponse<T> {
  message: string;
  data: T | null;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
  error?: {
    code: HTTPResponseCode;
    isOperational: boolean;
    stack?: string;
  };
}

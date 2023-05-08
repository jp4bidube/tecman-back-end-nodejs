import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/errors/apiErrors";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const statsuCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Internal server error";

  console.error(error.message);
  return response.status(statsuCode).json({
    success: false,
    statusCode: statsuCode,
    messages: !error.validation ? [message] : error.validation,
  });
};

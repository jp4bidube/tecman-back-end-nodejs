import { Response } from "express";

export const ok = (response: Response, data: any) => {
  return response.status(200).json({
    success: true,
    statusCode: 200,
    result: data,
  });
};

export const created = (response: Response, data: any) => {
  return response.status(201).json({
    success: true,
    statusCode: 201,
    result: data,
  });
};

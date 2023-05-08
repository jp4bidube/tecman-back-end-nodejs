interface IApiError {
  message: string;
  statusCode: number;
  validation?: any[];
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly validation: any[] | undefined;

  constructor(
    message: string,
    statusCode: number,
    validation: any[] | undefined
  ) {
    super(message);
    this.statusCode = statusCode;
    this.validation = validation;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string, validation?: any[]) {
    super(message, 400, validation);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404, undefined);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, 403, undefined);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401, undefined);
  }
}

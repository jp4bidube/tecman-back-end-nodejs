import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/errors/apiErrors";
import { verify, VerifyErrors } from "jsonwebtoken";
import { IJwt, checkWithError } from "../utils/helpers/jwt-helper";
import { TokenGeneration } from "src/provider/TokenGeneration";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    throw new UnauthorizedError("Token está faltando");
  }

  const [, token] = authToken.split(" ");

  const tokenGenerator = new TokenGeneration();
  tokenGenerator.verifyToken(token, "ACCESS_TOKEN");

  next();
}

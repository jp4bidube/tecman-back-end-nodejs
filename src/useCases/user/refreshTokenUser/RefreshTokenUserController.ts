import { Request, Response } from "express";
import { z } from "zod";
import { RefreshTokenUserUsecase } from "./RefreshTokenUserUsecase";
import { BadRequestError } from "@utils/errors/apiErrors";
import { ok } from "@utils/helpers/http-helper";

class RefreshTokenUserController {
  constructor(private refreshTokenUserUseCase: RefreshTokenUserUsecase) {}

  async handle(request: Request, response: Response) {
    const { refresh_token } = request.params;
    console.log(refresh_token)
    const validatedToken = await z.string().safeParseAsync(refresh_token);

    if (!validatedToken.success) {
      throw new BadRequestError("", validatedToken.error.issues);
    }
    const newTokens = await this.refreshTokenUserUseCase.execute(
      validatedToken.data
    );

    return ok(response, newTokens);
  }
}

export { RefreshTokenUserController };

import { Request, Response } from "express";
import { BadRequestError } from "@utils/errors/apiErrors";
import { ok } from "@utils/helpers/http-helper";
import { Controller } from "@utils/protocols";
import { authenticateUserSchema } from "./AuthenticateUserSchema";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export interface IAuthenticateUserUseCase {
  teste(username: string, password: string): Promise<string>;
}
export class AuthenticateUserController implements Controller {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const validatedUserPayload = await authenticateUserSchema.safeParseAsync(
      request.body
    );
    
    if (!validatedUserPayload.success) {
      throw new BadRequestError("", validatedUserPayload.error.issues);
    }

    const token = await this.authenticateUserUseCase.execute(
      username,
      password
    );

    return ok(response, token);
  }
}

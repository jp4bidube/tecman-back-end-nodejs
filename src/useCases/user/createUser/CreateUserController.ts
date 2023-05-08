import { Request, Response } from "express";
import { BadRequestError } from "@utils/errors/apiErrors";
import { created } from "@utils/helpers/http-helper";
import { Controller } from "@utils/protocols";
import { createUserSchema } from "./CreateUserSchema";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController implements Controller {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response) {
    const validatedUserPayload = await createUserSchema.safeParseAsync(
      request.body
    );

    if (!validatedUserPayload.success) {
      throw new BadRequestError("", validatedUserPayload.error.issues);
    }

    const createdUser = await this.createUserUseCase.execute(validatedUserPayload.data)

    return created(response, createdUser);
  }
}

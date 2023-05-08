import { UserRepository } from "@repositories/implementations/UserRepository";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

const userRepository = new UserRepository();

const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
);

export { authenticateUserController, authenticateUserUseCase };

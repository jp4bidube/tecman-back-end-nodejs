import { UserRepository } from "@repositories/implementations/UserRepository";
import { RefreshTokenUserController } from "./RefreshTokenUserController";
import { RefreshTokenUserUsecase } from "./RefreshTokenUserUsecase";

const userRepository = new UserRepository();
const refreshTokenUserUseCase = new RefreshTokenUserUsecase(userRepository);
const refreshTokenUserController = new RefreshTokenUserController(
  refreshTokenUserUseCase
);

export { refreshTokenUserController };

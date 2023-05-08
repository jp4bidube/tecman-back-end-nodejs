import { encrypt } from "@middlewares/encrypt";
import { IUserRepository } from "@repositories/IUserRepository";
import { BadRequestError } from "@utils/errors/apiErrors";
import { TokenGeneration } from "src/provider/TokenGeneration";

export class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(username: string, password: string) {
    const userAlredyExists = await this.userRepository.findByUsername(
      username,
      true
    );

    if (!userAlredyExists) {
      throw new BadRequestError("Usuário ou senha incorreta");
    }

    const passwordEncrypted = encrypt(password);
    if (passwordEncrypted !== userAlredyExists.password!) {
      throw new BadRequestError("Usuário ou senha incorreta");
    }

    const tokenGenerator = new TokenGeneration();

    return tokenGenerator.execute(userAlredyExists);
  }
}

import { User } from "@prisma/client";
import { IUserRepository } from "@repositories/IUserRepository";
import { TokenGeneration } from "src/provider/TokenGeneration";

class RefreshTokenUserUsecase {
  constructor(private userRepository: IUserRepository) {}

  async execute(refreshToken: string) {
    const tokenGenerator = new TokenGeneration();
    const verifiedtoken = tokenGenerator.verifyToken(
      refreshToken,
      "REFRESH_TOKEN"
    );
      console.log(verifiedtoken)
    const user = await this.userRepository.findByUsername(
      verifiedtoken.username
    );
    return tokenGenerator.execute(user as User);
  }
}

export { RefreshTokenUserUsecase };


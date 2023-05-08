import { IEmployeeRepository } from "@repositories/IEmployeeRepository";
import { IUserRepository } from "@repositories/IUserRepository";
import { BadRequestError } from "@utils/errors/apiErrors";
import { CreateUserSchema } from "./CreateUserSchema";
import { encrypt } from "@middlewares/encrypt";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(user: CreateUserSchema) {
    const userFound = await this.userRepository.findByUsername(user.username);
    if (userFound !== null) {
      throw new BadRequestError("Nome de usuário já esta em uso");
    }
    
    const encryptedPassword = encrypt(user.password);

    const createdUser = await this.userRepository.create({
      ...user,
      password: encryptedPassword,
    });

    return createdUser
  }
}

import { Employee, User } from "@prisma/client";
import { CreateUserSchema } from "@useCases/user/createUser/CreateUserSchema";

export interface IUserRepository {
  findByUsername(
    username: string,
    full?: boolean
  ): Promise<(User & { employee: Employee }) | null>;

  create(user: CreateUserSchema): Promise<User | null>;
}

import { Employee, User } from "@prisma/client";
import { client } from "@prismaProvider/client";
import { IUserRepository } from "@repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  async findByUsername(
    username: string,
    full?: boolean
  ) {
    const user = await client.user.findFirst({
      where: { username },
      include: {
        employee: full ?? false,
      },
    });

    return user;
  }
  async create(user: {
    username: string;
    password: string;
    employeeId: number;
    role: number;
  }): Promise<User | null> {
    const createdUser = await client.user.create({
      data: {
        username: user.username,
        password: user.password,
        employeeId: user.employeeId,
      },
    });

    return createdUser;
  }
}

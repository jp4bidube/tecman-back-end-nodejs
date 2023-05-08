import { UserRepository } from "@repositories/implementations/UserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { EmployeeRepository } from "@repositories/implementations/EmployeeRepository";

const userRepo = new UserRepository();
const employeeRepo = new EmployeeRepository();

const createUserUseCase = new CreateUserUseCase(userRepo, employeeRepo);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };

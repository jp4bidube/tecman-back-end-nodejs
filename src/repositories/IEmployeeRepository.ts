import { Employee, EmployeeStatus } from "@prisma/client";

export interface IEmployeeRepository {
  findById(id: number): Promise<(Employee & { employeeStatus: EmployeeStatus }) | null>;
}

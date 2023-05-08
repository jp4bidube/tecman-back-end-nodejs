import { Employee, EmployeeStatus } from "@prisma/client";
import { client } from "@prismaProvider/client";
import { IEmployeeRepository } from "@repositories/IEmployeeRepository";

export class EmployeeRepository implements IEmployeeRepository {
  async findById(id: number): Promise<(Employee & { employeeStatus: EmployeeStatus; }) | null> {
    const employee = await client.employee.findUnique({
      where: {
        id,
      },
      include: {
        employeeStatus: true,
      },
    });

    return employee
  }
}

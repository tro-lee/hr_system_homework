import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Employee } from '@/app/employees/page';

export type EmployeeResponse = {
  employees: Employee[];
  error?: string;
};

export async function GET(): Promise<NextResponse<EmployeeResponse>> {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        organization: true,
      }
    });

    const formattedEmployees = employees.map(employee => ({
      id: employee.id,
      name: employee.name,
      department: employee.organization.name || 'N/A',
      position: employee.position || 'N/A',
      email: `${employee.name.toLowerCase().replace(' ', '.')}@company.com`, // 示例邮箱
      employeeId: `EMP${employee.id.toString().padStart(4, '0')}`,
      hireDate: employee.hireDate.toISOString().split('T')[0],
      phone: employee.phone || 'N/A',
    }));

    return NextResponse.json({ employees: formattedEmployees });
  } catch (error) {
    console.error('Failed to fetch employees:', error);
    return NextResponse.json({ employees: [], error: 'Failed to fetch employees' }, { status: 500 });
  }
}
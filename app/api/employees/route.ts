import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        employeeOrganizations: {
          include: {
            organization: true,
            position: true,
          }
        },
      },
    });

    const formattedEmployees = employees.map(employee => ({
      id: employee.id,
      name: employee.name,
      department: employee.employeeOrganizations[0]?.organization.name || 'N/A',
      position: employee.employeeOrganizations[0]?.position.name || 'N/A',
      email: `${employee.name.toLowerCase().replace(' ', '.')}@company.com`, // 示例邮箱
      employeeId: `EMP${employee.id.toString().padStart(4, '0')}`,
      hireDate: employee.employeeOrganizations[0]?.hireDate.toISOString().split('T')[0] || 'N/A',
      phone: employee.employeeOrganizations[0]?.phone || 'N/A',
    }));

    return NextResponse.json(formattedEmployees);
  } catch (error) {
    console.error('Failed to fetch employees:', error);
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const organizationStructure = await prisma.organization.findMany({
      include: {
        children: {
          include: {
            children: {
              include: {
                children: {
                  include: {
                    children: true,
                    employeeOrganizations: {
                      include: {
                        employee: true,
                        position: true,
                      },
                    },
                  },
                },
                employeeOrganizations: {
                  include: {
                    employee: true,
                    position: true,
                  },
                },
              },
            },
            employeeOrganizations: {
              include: {
                employee: true,
                position: true,
              },
            },
          },
        },
        employeeOrganizations: {
          include: {
            employee: true,
            position: true,
          },
        },
      },
      where: {
        parentId: null,
      },
    });

    return NextResponse.json(organizationStructure);
  } catch (error) {
    console.error('Error fetching organization structure:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
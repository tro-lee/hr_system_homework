import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [jobOpenings, candidates, offers] = await Promise.all([
      prisma.jobOpening.findMany({
        include: {
          organization: true,
          applications: {
            include: {
              candidate: true,
            },
          },
        },
      }),
      prisma.candidate.findMany({
        include: {
          applications: {
            include: {
              jobOpening: {
                include: {
                  organization: true,
                },
              },
            },
          },
        },
      }),
      prisma.offer.findMany({
        include: {
          application: {
            include: {
              candidate: true,
              jobOpening: {
                include: {
                  organization: true,
                },
              },
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      jobOpenings,
      candidates,
      offers,
    });
  } catch (error) {
    console.error('Error fetching recruitment data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status, isAccepted } = await request.json();

    const updatedOffer = await prisma.offer.update({
      where: { id: parseInt(id) },
      data: {
        status,
        isAccepted
      },
      include: {
        application: {
          include: {
            jobOpening: {
              include: {
                organization: true
              }
            },
            candidate: true
          }
        }
      }
    });

    // 检查是否需要自动生成员工
    if (isAccepted && updatedOffer.startDate <= new Date() && updatedOffer.application.status === 'completed') {
      const newEmployee = await prisma.employee.create({
        data: {
          name: updatedOffer.application.candidate.name,
          position: updatedOffer.application.jobOpening.title,
          hireDate: updatedOffer.startDate,
          phone: updatedOffer.application.candidate.phone || '',
          organizationId: updatedOffer.application.jobOpening.organizationId
        }
      });

      // 更新申请状态为 'hired'
      await prisma.application.update({
        where: { id: updatedOffer.applicationId },
        data: { status: 'hired' }
      });

      return NextResponse.json({ message: 'Offer updated and employee created', employee: newEmployee });
    }

    return NextResponse.json({ message: 'Offer updated successfully' });
  } catch (error) {
    console.error('Error updating offer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 可以添加 POST, PUT, DELETE 方法来处理创建、更新和删除操作
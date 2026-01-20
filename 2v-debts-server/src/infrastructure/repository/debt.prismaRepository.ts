import { DebtStatus, Prisma } from '../../../prisma/generated/prisma/client';
import type { debtStatus } from '../../domain/entities/debt.entity';
import { prisma } from '../database/prisma';

export class PrismaDebtRepository {
  async findByUserIdPaginated(
    user_id: string,
    options?: { status: debtStatus | any; search: string },
    constraints?: { limit: number; page: number },
  ) {
    const page = Number(constraints?.page) || 1;
    const limit = Math.min(Number(constraints?.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const where: Prisma.DebtWhereInput = {
      AND: [
        {
          OR: [{ debtor_id: user_id }, { creditor_id: user_id }],
        },
        { status: { not: DebtStatus.DELETED } },
        ...(options?.status ? [{ status: options.status }] : []),
        ...(options?.search
          ? [
              {
                title: {
                  contains: options.search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ]
          : []),
      ],
    };

    const [debts, count] = await Promise.all([
      prisma.debt.findMany({
        where,
        skip,
        take: limit,
        include: {
          debtor: true,
        },
        orderBy: { createdAt: 'desc' },
      }),

      prisma.debt.count({ where }),
    ]);

    return {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      data: debts,
    };
  }

  findOneById(id: string, options?: { status: debtStatus | any }) {
    return prisma.debt.findFirst({ where: { id, ...options } });
  }

  create(data: any) {
    return prisma.debt.create({
      data,
    });
  }

  update(id: string, data: any) {
    return prisma.debt.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return prisma.debt.update({
      where: { id },
      data: { status: DebtStatus.DELETED },
    });
  }
}

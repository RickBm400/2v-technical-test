import type { Prisma } from '../../../prisma/generated/prisma/client';
import { prisma } from '../database/prisma';

export class PrismaMovementRepository {
  create(data: Prisma.MovementCreateInput) {
    return prisma.movement.create({ data });
  }

  findByDebtId(debt_id: string) {
    return prisma.movement.findMany({
      where: { debt_id },
      orderBy: { createdAt: 'desc' },
    });
  }
}

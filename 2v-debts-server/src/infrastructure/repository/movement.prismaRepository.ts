import { prisma } from '../database/prisma';

export class PrismaMovementRepository {
  create(data: any) {
    return prisma.movement.create({ data } as any);
  }

  findByDebtId(debt_id: string) {
    return prisma.movement.findMany({
      where: { debt_id },
      orderBy: { createdAt: 'desc' },
    });
  }
}

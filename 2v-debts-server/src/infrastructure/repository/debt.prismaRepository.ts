import {
  DebtStatus,
  type Debt,
  type Prisma,
} from '../../../prisma/generated/prisma/client';
import type { debtStatus } from '../../domain/entities/debt.entity';
import { prisma } from '../database/prisma';

export class PrismaDebtRepository {
  findByUserId(user_id: string) {
    return prisma.debt.findMany({
      where: { OR: [{ debtorId: user_id }, { creditorId: user_id }] },
    });
  }

  findById(id: string, options?: { status: debtStatus | any }) {
    console.log({ where: { id, ...options } });
    return prisma.debt.findFirst({ where: { id, ...options } });
  }

  create(data: Prisma.DebtCreateInput) {
    return prisma.debt.create({ data });
  }

  update(id: string, data: any) {
    return prisma.debt.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.debt.update({
      where: { id },
      data: { status: DebtStatus.DELETED },
    });
  }
}

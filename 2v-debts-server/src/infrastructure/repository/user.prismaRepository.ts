import type { User } from '../../../prisma/generated/prisma/client';
import { prisma } from '../database/prisma';

export class PrismaUserRepository {
  findByEmail(email: string | null = null) {
    if (!email) throw new Error('Email is required');

    return prisma.user.findUnique({ where: { email } });
  }

  findMany(currentUserId: string) {
    return prisma.user.findMany({ where: { id: { not: currentUserId } } });
  }

  create(data: User) {
    return prisma.user.create({ data } as any);
  }
}

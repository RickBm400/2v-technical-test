import type { User } from '../../../prisma/generated/prisma/client';
import { prisma } from '../database/prisma';

export class PrismaUserRepository {
  findByEmail(email: string | null = null) {
    if (!email) throw new Error('Email is required');

    return prisma.user.findUnique({ where: { email } });
  }

  create(data: User) {
    return prisma.user.create({ data } as any);
  }
}

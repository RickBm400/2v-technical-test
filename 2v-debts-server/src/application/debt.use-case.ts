import { debtStatus, type Debt } from '../domain/entities/debt.entity';
import { PrismaDebtRepository } from '../infrastructure/repository/debt.prismaRepository';
import {
  deleteCacheByPattern,
  getCache,
  setCache,
} from '../infrastructure/utils/redis.helper';
import { CustomError } from '../infrastructure/web/middlewares/error-handler.middleware';
import type { UseCase } from '../shared/use-cases.types';

export class CreateDebtUseCase implements UseCase {
  constructor(
    private debtRepository: PrismaDebtRepository = new PrismaDebtRepository(),
  ) {}

  async execute(debtData: Partial<Debt>) {
    const debt = await this.debtRepository.create(debtData as any);
    if (!debt) throw new CustomError("Couldn\'t create debt", 200);
    return debt;
  }
}

export class UpdateDebtUseCase implements UseCase {
  constructor(
    private debtRepository: PrismaDebtRepository = new PrismaDebtRepository(),
  ) {}

  async execute(id: string | null, debtData: any) {
    if (!id) throw new CustomError('id is required', 400);

    const debt = await this.debtRepository.update(id, debtData);

    await deleteCacheByPattern(`debts|${debt.creditorId}|*`);

    return debt;
  }
}

export class DeleteDebtUseCase implements UseCase {
  constructor(
    private debtRepository: PrismaDebtRepository = new PrismaDebtRepository(),
  ) {}

  async execute(id: string) {
    const debt = await this.debtRepository.findOneById(id, {
      status: { not: debtStatus.DELETED },
    });

    if (!debt) throw new CustomError("Record doesn't exist", 404);

    await this.debtRepository.delete(id);

    await deleteCacheByPattern(`debts|${debt.creditorId}|*`);

    return id;
  }
}

export class ListDebtPaginatedUseCase implements UseCase {
  constructor(
    private debtRepository: PrismaDebtRepository = new PrismaDebtRepository(),
  ) {}

  async execute(
    userId: string,
    options?: { status: debtStatus | any; search: string },
    constraints?: { limit: number; page: number },
  ) {
    const cacheKey = [
      'debts',
      userId,
      `page:${constraints?.page ?? 1}`,
      `limit:${constraints?.limit ?? 10}`,
      `status:${options?.status ?? 'ALL'}`,
      `search:${options?.search ?? ''}`,
    ].join('|');

    const cached = await getCache<any>(cacheKey);
    if (cached) return cached;

    const result = await this.debtRepository.findByUserIdPaginated(
      userId,
      options,
      constraints,
    );
    await setCache(cacheKey, result, 60);

    return result;
  }
}

import { debtStatus, type Debt } from '../domain/entities/debt.entity';
import { PrismaDebtRepository } from '../infrastructure/repository/debt.prismaRepository';
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

  async execute(id: string | null, debtData: Partial<Debt>) {
    if (!id) throw new CustomError('id is required', 400);
    return await this.debtRepository.update(id, debtData);
  }
}

export class DeleteDebtUSeCase implements UseCase {
  constructor(
    private debtRepository: PrismaDebtRepository = new PrismaDebtRepository(),
  ) {}

  async execute(id: string) {
    const debtExits = await this.debtRepository.findById(id, {
      status: { not: debtStatus.DELETED },
    });
    if (!debtExits) throw new CustomError("Regist doesn\'t exist", 404);

    await this.debtRepository.delete(id);
    return id;
  }
}

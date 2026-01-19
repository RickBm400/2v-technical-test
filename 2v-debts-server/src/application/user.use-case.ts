import { PrismaUserRepository } from '../infrastructure/repository/user.prismaRepository';
import type { UseCase } from '../shared/use-cases.types';

export class GetUserListUserCase implements UseCase {
  constructor(
    private userRepository: PrismaUserRepository = new PrismaUserRepository(),
  ) {}

  async execute(currentUserId: string) {
    return await this.userRepository.findMany(currentUserId);
  }
}

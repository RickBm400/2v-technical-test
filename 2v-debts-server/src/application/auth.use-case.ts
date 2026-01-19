import type { User } from '../domain/entities/user.entity';
import { PrismaUserRepository } from '../infrastructure/repository/user.prismaRepository';
import { BcryptPasswordHasher } from '../infrastructure/security/BcryptService';

export class RegisterUseCase {
  constructor(
    private userRepository: PrismaUserRepository = new PrismaUserRepository(),
    private passwordHasher: BcryptPasswordHasher = new BcryptPasswordHasher(),
  ) {}

  async execute(payload: Partial<User>) {
    const userExists = await this.userRepository.findByEmail(payload.email);
    if (userExists) throw new Error('User already exists');

    const hashPassword = await this.passwordHasher.hash(payload.password!);

    return this.userRepository.create({
      ...payload,
      password: hashPassword,
    } as any);
  }
}

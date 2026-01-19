import type { User } from '../domain/entities/user.entity';
import { PrismaUserRepository } from '../infrastructure/repository/user.prismaRepository';
import { BcryptPasswordHasher } from '../infrastructure/security/BcryptService';
import { JwtService } from '../infrastructure/security/JwtService';
import type { UseCase } from '../shared/use-cases.types';

export class RegisterUseCase implements UseCase {
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

export class LoginUseCase implements UseCase {
  constructor(
    private userRepository: PrismaUserRepository = new PrismaUserRepository(),
    private passwordHasher: BcryptPasswordHasher = new BcryptPasswordHasher(),
    private jwtService: JwtService = new JwtService(),
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isPasswordValid = await this.passwordHasher.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) throw new Error('Invalid credentials');
    user;
    return {
      token: this.jwtService.sign({ userId: user.id, email: user.email }),
    };
  }
}

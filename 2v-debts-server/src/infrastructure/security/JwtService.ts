import jwt from 'jsonwebtoken';

export class JwtService {
  static sign(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
  }

  static verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}

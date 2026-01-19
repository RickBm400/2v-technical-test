import jwt from 'jsonwebtoken';
import 'dotenv/config';

export class JwtService {
  sign(payload: { userId: string; email: string }) {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
  }

  verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}

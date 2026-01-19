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

  validateTokenExpiration(token: string): boolean {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      return decoded.exp ? decoded.exp * 1000 > Date.now() : false;
    } catch {
      return false;
    }
  }
}

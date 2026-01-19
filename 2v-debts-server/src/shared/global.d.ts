declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      NODE_ENV: string;
      REDIS_URL: string;
    }
  }

  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export {};

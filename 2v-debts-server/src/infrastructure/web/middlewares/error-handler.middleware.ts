import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = err instanceof Error ? err.message : 'Internal server error';
  const statusCode =
    err instanceof Error && 'statusCode' in err ? (err as any).statusCode : 500;

  res.status(statusCode).json({ message: JSON.parse(JSON.stringify(message)) });
};

export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

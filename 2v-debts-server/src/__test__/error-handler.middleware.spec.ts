import type { Request, Response, NextFunction } from 'express';
import {
  errorHandler,
  CustomError,
} from '../infrastructure/web/middlewares/error-handler.middleware';
import { beforeEach, describe, it } from 'node:test';
import { expect, jest } from '@jest/globals';

describe('errorHandler middleware', () => {
  const makeRes = () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    return { status, json } as unknown as Response & {
      status: jest.Mock;
      json: jest.Mock;
    };
  };

  const req = {} as Request;
  const next = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should use 500 and generic message for non-Error values', () => {
    const res = makeRes();
    errorHandler('boom' as any, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status(500).json).toHaveBeenCalledWith({ message: 'boom' });
  });

  it('should use Error.message when err is an Error', () => {
    const res = makeRes();
    const err = new Error('explicit failure');

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status(500).json).toHaveBeenCalledWith({
      message: 'explicit failure',
    });
  });

  it('should respect statusCode when present on error-like object', () => {
    const res = makeRes();
    const err: any = new Error('not found');
    err.statusCode = 404;

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.status(404).json).toHaveBeenCalledWith({ message: 'not found' });
  });

  it('should serialize non-serializable messages safely', () => {
    const res = makeRes();
    const cyclic: any = { a: 1 };
    cyclic.self = cyclic; // introduce circular ref
    const err = new Error();
    // Override message with a non-plain object via cast
    (err as any).message = cyclic;

    errorHandler(err as any, req, res, next);

    // JSON.parse(JSON.stringify(cyclic)) drops the cycle to {"a":1}
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status(500).json).toHaveBeenCalledWith({ message: { a: 1 } });
  });

  it('should support CustomError with message and statusCode', () => {
    const res = makeRes();
    const err = new CustomError('bad request', 400);

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status(400).json).toHaveBeenCalledWith({
      message: 'bad request',
    });
  });

  // New tests appended
  it('should default to 500 and "Internal server error" when non-Error and non-string is passed', () => {
    const res = makeRes();
    errorHandler({ any: 'object' } as any, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status(500).json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });

  it('should fallback to 500 when statusCode exists but is not a number', () => {
    const res = makeRes();
    const err: any = new Error('weird');
    err.statusCode = 'NaN';

    errorHandler(err as any, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status(500).json).toHaveBeenCalledWith({ message: 'weird' });
  });

  it('should serialize plain object messages to JSON objects', () => {
    const res = makeRes();
    const err = new Error() as any;
    err.message = { reason: 'invalid', field: 'email' };

    errorHandler(err as any, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status(500).json).toHaveBeenCalledWith({ message: { reason: 'invalid', field: 'email' } });
  });

  it('should handle Error with undefined message as empty string', () => {
    const res = makeRes();
    const err = new Error('anything');
    (err as any).message = undefined;

    errorHandler(err as any, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status(500).json).toHaveBeenCalledWith({ message: '' });
  });

  it('should call next when headers already sent', () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status, json, headersSent: true } as unknown as Response & { headersSent: boolean };

    errorHandler(new Error('late error'), req, res, next);

    expect(next).toHaveBeenCalled();
    expect(status).not.toHaveBeenCalled();
    expect(json).not.toHaveBeenCalled();
  });
});

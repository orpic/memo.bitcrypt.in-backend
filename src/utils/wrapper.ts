import { NextFunction, Request, Response } from 'express';

export function asyncErrorHandler(fn: (...args: any) => Promise<unknown>) {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next);
  };
}

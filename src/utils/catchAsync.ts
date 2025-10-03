import { Request, Response, NextFunction } from "express";

// Higher-order function for async error handling
const catchAsync = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default catchAsync;
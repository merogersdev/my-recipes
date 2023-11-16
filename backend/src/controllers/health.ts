import { type Request, type Response, type NextFunction } from 'express';

export const healthCheck = (_req: Request, res: Response, _next: NextFunction) => {
  res.sendStatus(200);
};

export default healthCheck;

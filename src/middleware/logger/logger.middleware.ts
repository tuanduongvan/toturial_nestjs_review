import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  use(req: Request, res: Response, next: NextFunction): void {
    const logger = new Logger('Request');
    logger.log(`${req.method} ${req.originalUrl}`);
    next();
  }
}

import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  use(req: Request, res: Response, next: NextFunction): void {
    const isAuth = false;
    if (!isAuth) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }
    (req as { user?: string }).user = 'Anh Tuan';
    next();
  }
}

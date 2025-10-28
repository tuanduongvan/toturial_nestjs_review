import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ValidateContentTypeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const contentType = request.headers['content-type'];

    if (contentType !== 'application/json') {
      throw new BadRequestException(
        'Invalid Content-Type. Expected application/json',
      );
    }

    return true;
  }
}

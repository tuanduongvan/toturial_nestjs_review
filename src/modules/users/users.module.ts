import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { DatabaseService } from '../db/db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LoggingMiddleware } from 'src/middleware/logging/logging.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, DatabaseService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes({
      path: 'users',
      method: RequestMethod.ALL,
    });
  }
}

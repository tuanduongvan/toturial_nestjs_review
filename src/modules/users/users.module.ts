import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { DatabaseService } from '../db/db.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, DatabaseService],
})
export class UsersModule {}

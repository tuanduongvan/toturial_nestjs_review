import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  getAllUsers(): string {
    return this.db.getAll();
  }
}

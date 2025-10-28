import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  getAll(): string {
    return 'All records of user from the database';
  }
}

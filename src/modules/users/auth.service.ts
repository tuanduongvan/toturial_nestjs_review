import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  authenticateUser(): string {
    return 'Login successful';
  }
}

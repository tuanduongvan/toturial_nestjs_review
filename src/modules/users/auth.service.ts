import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getUserAuthentication(): string {
    return 'Login successful';
  }
}

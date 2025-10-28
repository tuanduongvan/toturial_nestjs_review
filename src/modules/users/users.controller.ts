import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getAllUsers(): string[] {
    return [
      this.authService.authenticateUser(),
      this.usersService.getAllUsers(),
    ];
  }
}

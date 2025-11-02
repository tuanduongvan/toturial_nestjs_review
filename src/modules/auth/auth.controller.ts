import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('/register')
  registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginUser(@Request() request: any): any {
    return this.authService.loginUser(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      request.user as { email: string; id: number },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfileUser(@Request() request: any): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return request.user;
  }
}

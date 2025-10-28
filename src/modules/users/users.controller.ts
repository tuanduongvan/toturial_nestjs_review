import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

const EXPECTED_CONTENT_TYPE = 'application/json';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  searchUsers(@Query() query: { name: string; age: number }): {
    Name: string;
    Age: number;
  } {
    return {
      Name: query.name,
      Age: query.age,
    };
  }

  @Get('/:id')
  getUserDetail(@Param('id') id: string): string {
    return 'User detail for user with id: ' + id;
  }

  @Post()
  createUser(
    @Body() body: any,
    @Headers('content-type') contentType: string,
  ): any {
    if (!contentType.includes(EXPECTED_CONTENT_TYPE)) {
      throw new BadRequestException(
        'Invalid Content-Type. Expected application/json',
      );
    }
    return body;
  }

  @Get()
  getAllUsers(): string[] {
    return [
      this.authService.authenticateUser(),
      this.usersService.getAllUsers(),
    ];
  }
}

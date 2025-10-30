import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Headers,
  Patch,
  Header,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { ValidateContentTypeGuard } from './validate-content-type.pipe';
import { DeleteResult } from 'typeorm';

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

  @Get('/all')
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async getUserDetail(@Param('id') id: string): Promise<User | null> {
    return this.usersService.find(+id);
  }

  @Patch('/:id')
  @UseGuards(ValidateContentTypeGuard)
  @Header('Cache-Control', 'no-store')
  @Header('Pragma', 'no-cache')
  @Header('Expires', '0')
  async updateUser(
    @Param('id') id: string,
    @Body() body: { name: string; email: string },
  ): Promise<User | null> {
    const user = await this.usersService.update(+id, body);
    return user;
  }

  @Post('/create')
  @UseGuards(ValidateContentTypeGuard)
  @Header('Cache-Control', 'no-store')
  @Header('Pragma', 'no-cache')
  @Header('Expires', '0')
  async createNewUser(
    @Body() body: { name: string; email: string; password: string },
  ): Promise<User> {
    const user = await this.usersService.createUser(body);
    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<DeleteResult> {
    const data = await this.usersService.delete(+id);
    return data;
  }
}

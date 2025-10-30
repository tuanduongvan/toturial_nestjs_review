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
  Req,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { ValidateContentTypeGuard } from './validate-content-type.pipe';
import { DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
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
  getAllUsers(@Req() request: Request & { user: string }): Promise<User[]> {
    const safeUser = String(request.user || '').replace(/[\r\n]/g, '');
    this.logger.log(`Request User: ${safeUser}`);
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
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const user = await this.usersService.update(+id, updateUserDto);
    return user;
  }

  @Post('/create')
  @UseGuards(ValidateContentTypeGuard)
  @Header('Cache-Control', 'no-store')
  @Header('Pragma', 'no-cache')
  @Header('Expires', '0')
  async createNewUser(@Body() createUser: CreateUserDto): Promise<User> {
    const user = await this.usersService.createUser(createUser);
    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<DeleteResult> {
    const data = await this.usersService.delete(+id);
    return data;
  }
}

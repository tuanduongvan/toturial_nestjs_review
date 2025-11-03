import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async find(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async createUser(dataUser: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(dataUser);
    if (newUser.password) {
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashedPassword;
    }
    return this.userRepository.save(newUser);
  }

  async update(id: number, dataUser: Partial<User>): Promise<User | null> {
    dataUser.updatedAt = new Date();
    await this.userRepository.update(id, dataUser);
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<DeleteResult> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && user.password && password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return user;
      }
    }
    return null;
  }

  async saveRefreshToken(userid: number, refreshToken: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userid });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    user.refresh_token = hashedRefreshToken;
    await this.userRepository.save(user);
  }

  async verifyRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      return false;
    }
    const status = await bcrypt.compare(refreshToken, user.refresh_token);
    if (status) {
      return true;
    }
    return false;
  }
}

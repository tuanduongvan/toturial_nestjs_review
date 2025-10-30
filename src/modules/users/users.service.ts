import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  find(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  createUser(dataUser: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(dataUser);
    return this.userRepository.save(newUser);
  }

  async update(id: number, dataUser: Partial<User>): Promise<User | null> {
    dataUser.updatedAt = new Date();
    await this.userRepository.update(id, dataUser);
    return this.userRepository.findOneBy({ id });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}

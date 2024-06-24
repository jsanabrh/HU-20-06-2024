import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { UsersDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(createUser: UsersDto): Promise<UsersEntity> {
    try {
      const user = await this.usersRepository.save(createUser);
      return user;
    } catch (error) {
      throw new NotFoundException('user creation failed');
    }
  }

  async findAll(): Promise<UsersEntity[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new NotFoundException('Error find User');
    }
  }

  async findOne(user_id: number): Promise<UsersEntity> {
    const user = await this.usersRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async update(id: number, updateUser: UsersDto): Promise<UsersEntity> {
    const user = await this.usersRepository.preload({
      user_id: id,
      ...updateUser,
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return await this.usersRepository.save(user);
  }

  async remove(user_id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    try {
      await this.usersRepository.remove(user);
    } catch (error) {
      throw new NotFoundException('Error deleting user');
    }
  }
}

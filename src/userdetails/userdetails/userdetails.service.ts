import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userdetails } from '../userdetails.entity';

@Injectable()
export class UserdetailsService {
  constructor(
    @InjectRepository(Userdetails) private userRepository: Repository<Userdetails>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find({ relations: ['transactions', 'fines'] });
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['transactions', 'fines'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createUser(data: Partial<Userdetails>) {
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  async updateUser(id: number, data: Partial<Userdetails>) {
    const user = await this.getUserById(id);
    Object.assign(user, data);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id);
    return await this.userRepository.remove(user);
  }
}

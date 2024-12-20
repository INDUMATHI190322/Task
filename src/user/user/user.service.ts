import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    console.log(`Creating user: ${JSON.stringify(user)}`);
    const newUser = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);
    console.log(`User created successfully: ${JSON.stringify(savedUser)}`);
    return savedUser;
  }
  async getUserDetails(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['transactions', 'transactions.book', 'fines'],
    });
    console.log(user,">>>>>>>>>>>>>>>>>>>>>>>");
  

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Calculate total fines and dues
    const totalFines = user.fines.reduce((sum, fine) => sum + fine.fineAmount, 0);
    const unpaidFines = user.fines.filter(fine => !fine.paid).reduce((sum, fine) => sum + fine.fineAmount, 0);

    return {
      personalInfo: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      transactions: user.transactions.map(transaction => ({
        bookTitle: transaction.book.title,
        borrowedDate: transaction.borrowDate,
        returnedDate: transaction.returnDate,
      })),
      fines: user.fines,
      totalFines,
      unpaidFines,
    };
  }


  async findAll(): Promise<User[]> {
    console.log('Fetching all users...');
    const users = await this.userRepository.find();
    console.log(`Found ${users.length} users.`);
    return users;
  }

  async findOne(id: number): Promise<User> {
    console.log(`Fetching user with ID: ${id}`);
    const user = await this.userRepository.findOne({ where: { id } ,      relations: ['transactions', 'transactions.book', 'fines'],
    });
    if (!user) {
      console.log(`User with ID ${id} not found.`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    console.log(`User found: ${JSON.stringify(user)}`);
    return user;
  }
  async update(id: number, user: Partial<User>): Promise<User> {
    console.log(`Updating user with ID: ${id}`);
    
    // Find the existing user
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    // Update only the user entity fields (not relations)
    const updatedUserData = { ...existingUser, ...user };
  
    // Save the updated user entity
    const updatedUser = await this.userRepository.save(updatedUserData);
    console.log(`User updated successfully: ${JSON.stringify(updatedUser)}`);
    return updatedUser;
  }
  

  async remove(id: number): Promise<void> {
    console.log(`Deleting user with ID: ${id}`);
    await this.findOne(id); // Ensure user exists
    await this.userRepository.delete(id);
    console.log(`User with ID ${id} deleted successfully.`);
  }
  // user.service.ts
async getUserById(id: number) {
  const user = await this.userRepository.findOne({
    where: { id },
    relations: ['transactions', 'transactions.book', 'fines'],
  });

  if (!user) {
    throw new Error(`User with ID ${id} not found`);
  }

  // Calculate total fines and unpaid fines
  const totalFines = user.fines.reduce((sum, fine) => sum + fine.fineAmount, 0);
  const unpaidFines = user.fines
    .filter((fine) => !fine.paid)
    .reduce((sum, fine) => sum + fine.fineAmount, 0);

  return {
    personalInfo: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
    transactions: user.transactions.map((transaction) => ({
      bookTitle: transaction.book,
      borrowedDate: transaction.borrowDate,
      returnedDate: transaction.returnDate || 'Not Returned',
    })),
    fines: user.fines,
    totalFines,
    unpaidFines,
  };
}

  // async getUserById(id: number): Promise<User> {
  //   const user = await this.userRepository.findOne({
  //     where: { id },
  //     relations: ['transactions', 'fines'], // Ensure related data is fetched
  //   });

  //   // Log the fetched data to ensure it's correct
  //   console.log('Fetched User Data:', user);
  //   console.log('Fetched User with Transactions and Fines:', user);


  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   return user;
  // }

  
}

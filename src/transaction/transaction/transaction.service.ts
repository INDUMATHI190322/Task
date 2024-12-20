import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../transactions.entity';
import { Book } from 'src/books/books.entity';
import { User } from 'src/user/users.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Calculate fine
  calculateFine(returnDate: string): number {
    const today = new Date();
    const returnDateObj = new Date(returnDate);

    const diffTime = today.getTime() - returnDateObj.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays * 1 : 0; // $1 per day fine
  }

  // Create a transaction
  async createTransaction(data: {
    bookId: number;
    userId: number;
    borrowDate: string;
    returnDate: string;
  }): Promise<Transaction> {
    const { bookId, userId, borrowDate, returnDate } = data;
  
    // Find the book by ID
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
  
    // Find the user by ID
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Calculate fine if applicable
    const fine = this.calculateFine(returnDate);
  
    // Create the transaction
    const transaction = this.transactionRepository.create({
      book,
      user,
      borrowDate,
      returnDate,
      fine,
    });
  
    // Save the transaction to the database
    return await this.transactionRepository.save(transaction);
  }
  
  // Fetch transactions
  async getTransactions(): Promise<Transaction[]> {

    let test =  await this.transactionRepository.find({
      relations: ['book', 'user'], // Load related entities
    });
    console.log(test,"test");
    return test
  }
    // Update a transaction
    async update(id: number, updateData: Partial<Transaction>) {
      const transaction = await this.transactionRepository.findOne({
        where: { id },
        relations: ['book', 'user'],
      });
        
      if (!transaction) {
        throw new Error(`Transaction with ID ${id} not found`);
      }
  
      // Update the book and user relationships correctly
      if (updateData.book) {
        const book = await this.bookRepository.findOne({
          where: { id: updateData.book.id },
        });       
         if (!book) {
          throw new Error(`Book with ID ${updateData.book.id} not found`);
        }
        transaction.book = book;
      }
  
      if (updateData.user) {
        const user = await this.userRepository.findOne({
          where: { id: updateData.user.id },
        });
                if (!user) {
          throw new Error(`User with ID ${updateData.user.id} not found`);
        }
        transaction.user = user;
      }
  
      // Update other properties like borrowDate and returnDate
      if (updateData.borrowDate) {
        transaction.borrowDate = updateData.borrowDate;
      }
      if (updateData.returnDate) {
        transaction.returnDate = updateData.returnDate;
      }
  
      // Save the updated transaction
      await this.transactionRepository.save(transaction);
      return transaction;
    }
  
    // Delete a transaction
    async remove(id: number): Promise<void> {
      await this.transactionRepository.delete(id);
    }
  
}

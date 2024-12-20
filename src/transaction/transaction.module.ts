import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';
import { Transaction } from './transactions.entity';
import { Book } from 'src/books/books.entity';
import { User } from 'src/user/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Book, User])],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}

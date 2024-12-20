import { Controller, Get, Post, Put,Param,Delete,Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from '../transactions.entity';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // Get all transactions
  @Get()
  async getTransactions() {
    return this.transactionService.getTransactions();
  }

  // Create a new transaction
  @Post()
  async createTransaction(@Body() transactionData: any) {
    return this.transactionService.createTransaction(transactionData);
  }
   // Update a transaction
   @Put(':id')
   async updateTransaction(@Param('id') id: number, @Body() updateData: Partial<Transaction>) {
     try {
       // Assuming you have a service to handle updates
       const updatedTransaction = await this.transactionService.update(id, updateData);
       if (!updatedTransaction) {
       console.log('Transaction not found');
       }
       return updatedTransaction;
     } catch (error) {
       // Log the error on the server
       console.error('Error updating transaction:', error);
       console.log('Error updating transaction');
     }
   }
   
 
   // Delete a transaction
   @Delete(':id')
   async remove(@Param('id') id: number) {
     return this.transactionService.remove(id);
   }
 
   // Calculate fine
   @Get('fine/:returnDate')
   calculateFine(@Param('returnDate') returnDate: string) {
     return this.transactionService.calculateFine(returnDate);
   }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { User } from './users.entity';
import { Fine } from 'src/fine/fine.entity';
import { TransactionModule } from 'src/transaction/transaction.module';
import { FineModule } from 'src/fine/fine.module';

@Module({
  imports: [TypeOrmModule.forFeature([User,Fine]),  // Import User entity here
  TransactionModule,  // If using transactions
  ],  
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}


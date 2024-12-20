import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserdetailsService } from './userdetails/userdetails.service';
import { UserdetailsController } from './userdetails/userdetails.controller';
import { Userdetails } from './userdetails.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Userdetails]), // Register the Librarian entity
  ],
  providers: [ UserdetailsService],
  controllers: [UserdetailsController]
})
export class UserdetailsModule {}

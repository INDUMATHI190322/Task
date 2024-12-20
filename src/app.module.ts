import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { UserModule } from './user/user.module';
import { LibrarianModule } from './librarian/librarian.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { FineModule } from './fine/fine.module';
import { UserdetailsModule } from './userdetails/userdetails.module';

config(); // Load environment variables from .env file

@Module({
  imports: [
    BooksModule,  UserModule,LibrarianModule,
    AuthorModule,
    CategoryModule,
    TransactionModule,
    FineModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // PostgreSQL as the database type
      host: process.env.DB_HOST || 'localhost', // PostgreSQL host (default: localhost)
      port: parseInt(process.env.DB_PORT) || 5432, // PostgreSQL port (default: 5432)
      username: process.env.DB_USERNAME,  // PostgreSQL username
      password: process.env.DB_PASSWORD , // PostgreSQL password
      database: process.env.DB_NAME,// PostgreSQL database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Path to entities
      synchronize: true, // Set to false in production to avoid auto-sync
    }),
    FineModule,
    UserdetailsModule,
    
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


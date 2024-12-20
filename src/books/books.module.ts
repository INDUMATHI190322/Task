import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';
import { Book } from './books.entity';
import { AuthorModule } from '../author/author.module';
import { CategoryModule } from '../category/category.module';
import { Author } from 'src/author/authors.entity';
import { Category } from 'src/category/categorys.entity';

@Module({
  imports: [TypeOrmModule.forFeature ([Book, Author, Category]),],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService,TypeOrmModule], 
})
export class BooksModule {}

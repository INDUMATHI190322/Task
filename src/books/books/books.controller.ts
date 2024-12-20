import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from '../books.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async findAll() {
    return this.bookService.findAll();
  }

  @Post()
  async create(@Body() bookData: any): Promise<Book> {
    try {
      const book = await this.bookService.create(bookData);
      return book;
    } catch (error) {
      throw new Error('Failed to create book');
    }
  }

  @Put(':id')
async update(@Param('id') id: number, @Body() bookData: Partial<Book>): Promise<Book> {
  try {
    return await this.bookService.update(id, bookData);
  } catch (error) {
    console.error('Error in updating book', error);
    throw new Error('Error in updating book');
  }
}


  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.bookService.delete(id);
  }
}

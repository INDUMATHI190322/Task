import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from '../authors.entity';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() author: Author): Promise<Author> {
    return this.authorService.create(author);
  }

  @Get()
  findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Author> {
    return this.authorService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() author: Author): Promise<Author> {
    return this.authorService.update(+id, author);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.authorService.remove(+id);
  }
}


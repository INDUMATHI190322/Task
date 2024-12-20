import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../categorys.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() category: Category): Promise<Category> {
    return this.categoryService.update(+id, category);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.remove(+id);
  }
}


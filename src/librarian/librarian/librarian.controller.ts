// src/librarians/librarians.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LibrariansService } from './librarian.service';
import { Librarian } from '../librarians.entity';

@Controller('librarians')
export class LibrariansController {
  constructor(private readonly librariansService: LibrariansService) {}

  @Get()
  async getAllLibrarians(): Promise<Librarian[]> {
    return this.librariansService.getLibrarians();
  }

  @Post()
  async createLibrarian(@Body() createLibrarianDto: Partial<Librarian>): Promise<Librarian> {
    return this.librariansService.createLibrarian(createLibrarianDto);
  }

  @Get(':id')
  async getLibrarian(@Param('id') id: number): Promise<Librarian> {
    return this.librariansService.getLibrarianById(id);
  }

  @Put(':id')
  async updateLibrarian(
    @Param('id') id: number,
    @Body() updateLibrarianDto: Partial<Librarian>,
  ): Promise<Librarian> {
    return this.librariansService.updateLibrarian(id, updateLibrarianDto);
  }

  @Delete(':id')
  async deleteLibrarian(@Param('id') id: number): Promise<void> {
    return this.librariansService.deleteLibrarian(id);
  }
}

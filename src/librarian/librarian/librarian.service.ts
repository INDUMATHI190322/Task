// src/librarians/librarians.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Librarian } from '../librarians.entity';

@Injectable()
export class LibrariansService {
  constructor(
    @InjectRepository(Librarian)
    private readonly librarianRepository: Repository<Librarian>,
  ) {}

  async createLibrarian(data: Partial<Librarian>): Promise<Librarian> {
    const librarian = this.librarianRepository.create(data);
    return this.librarianRepository.save(librarian);
  }

  async getLibrarians(): Promise<Librarian[]> {
    return this.librarianRepository.find();
  }

  async getLibrarianById(id: number): Promise<Librarian> {
    return this.librarianRepository.findOneBy({ id });
  }

  async updateLibrarian(id: number, data: Partial<Librarian>): Promise<Librarian> {
    await this.librarianRepository.update(id, data);
    return this.getLibrarianById(id);
  }

  async deleteLibrarian(id: number): Promise<void> {
    await this.librarianRepository.delete(id);
  }
}

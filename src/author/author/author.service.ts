import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../authors.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async create(author: Author): Promise<Author> {
    return this.authorRepository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async findOne(id): Promise<Author> {
    return this.authorRepository.findOne(id);
  }

  async update(id, author: Author): Promise<Author> {
    await this.authorRepository.update(id, author);
    return this.authorRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.authorRepository.delete(id);
  }
}

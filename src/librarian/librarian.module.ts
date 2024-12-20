import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Librarian } from './librarians.entity';
import { LibrariansService } from './librarian/librarian.service';
import { LibrariansController } from './librarian/librarian.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Librarian]), // Register the Librarian entity
  ],
  providers: [LibrariansService], // Register the LibrarianService
  controllers: [LibrariansController], // Register the LibrarianController
})
export class LibrarianModule {}

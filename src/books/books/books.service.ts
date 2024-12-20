import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books.entity';
import { Author } from 'src/author/authors.entity';
import { Category } from 'src/category/categorys.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,  // Inject the Author repository

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // async findAll(): Promise<Book[]> {
  //   return this.bookRepository.find({ relations: ['author', 'category'] });
  // }
  async findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne({
      where: { id },
      relations: ['author', 'category'],
    });
  }
  // Example for fetching books with their related author and category
async getBooks(): Promise<Book[]> {
  return this.bookRepository.find({
    relations: ['author', 'category'],
  });
}



async create(bookData: any): Promise<Book> {
  const { authorId, categoryId, title, year, stock } = bookData;

  // Fetch the author and category by their IDs
  const author = await this.authorRepository.findOne({ where: { id: authorId } });
  if (!author) {
    throw new Error('Invalid author ID');
  }

  const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
  if (!category) {
    throw new Error('Invalid category ID');
  }

  // Create the book entity
  const book = this.bookRepository.create({
    title,
    year,
    stock,
    author,
    category,
  });

  // Save the book and return it
  return this.bookRepository.save(book);
}

// Method to get all books
async findAll(): Promise<Book[]> {
  return this.bookRepository.find({
    relations: ['author', 'category'],
  });
}

  async update(id: number, bookData: Partial<Book>): Promise<Book> {
    // Extract the authorId and categoryId from bookData (if they exist)
    const { authorId, categoryId, ...restData } = bookData;
  
    // Try to find the existing book by its ID with relations
    let book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author', 'category'],
    });
  
    // If no book found, throw an error
    if (!book) {
      throw new Error('Book not found');
    }
  
    // Handle updating the author if the authorId is provided
    if (authorId) {
      const author = await this.authorRepository.findOne({
        where: { id: authorId }, // Pass an object with `id` property
      });
      if (!author) {
        throw new Error('Invalid author ID');
      }
      book.author = author;  // Update the author relation
    }
  
    // Handle updating the category if the categoryId is provided
    if (categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId }, // Pass an object with `id` property
      });
      if (!category) {
        throw new Error('Invalid category ID');
      }
      book.category = category;  // Update the category relation
    }
  
    // Update the rest of the book data (e.g., title, year, stock)
    Object.assign(book, restData);
  
    // Save the updated book and return it
    return this.bookRepository.save(book);
  }
  

  // async update(id: number, bookData: Partial<Book>): Promise<Book> {
  //   try {
  //     const { author, category, ...restData } = bookData;

  //     // Fetch the author and category entities from the database
  //     const authorEntity = author ? await this.authorRepository.findOne({ where: { id: author.id } }) : null;
  //     const categoryEntity = category ? await this.categoryRepository.findOne({ where: { id: category.id } }) : null;

  //     if (!authorEntity || !categoryEntity) {
  //       throw new Error('Invalid author or category ID');
  //     }

  //     // Update the book
  //     await this.bookRepository.update(id, {
  //       ...restData,
  //       author: authorEntity,
  //       category: categoryEntity,
  //     });

  //     // Return the updated book
  //     const updatedBook = await this.bookRepository.findOne({
  //       where: { id },
  //       relations: ['author', 'category'], // Use relations as the correct syntax
  //     });

  //     return updatedBook;
  //   } catch (error) {
  //     console.error('Error updating book:', error);
  //     throw new Error('Failed to update book');
  //   }
  // }

  async delete(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}

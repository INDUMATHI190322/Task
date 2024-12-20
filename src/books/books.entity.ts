import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToMany,JoinColumn} from 'typeorm';
import { Author } from 'src/author/authors.entity';
import { Category } from 'src/category/categorys.entity';
import { Transaction } from 'src/transaction/transactions.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  authorId?: number;
  categoryId?: number;

  @ManyToOne(() => Author, { nullable: false })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  // @ManyToOne(() => Author, (author) => author.books)
  // @JoinColumn({ name: 'authorId' })
  // author: Author;

  // @ManyToOne(() => Category, (category) => category.books)
  // @JoinColumn({ name: 'categoryId' })
  // category: Category;

  // @ManyToOne(() => Author)
  // @JoinColumn({ name: 'authorId' })
  // author: Author;

  // @ManyToOne(() => Category)
  // @JoinColumn({ name: 'categoryId' })
  // category: Category;
    // Define the inverse side of the relationship
  @OneToMany(() => Transaction, (transaction) => transaction.book)
    transactions: Transaction[];  // This will hold all transactions related to this book
  
  

  @Column()
  year: number;

  @Column('int')
  stock: number;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne ,JoinColumn} from 'typeorm';
import { User } from 'src/user/users.entity';
import { Book } from 'src/books/books.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'bookId' })  // This tells TypeORM that bookId is a foreign key
  book: Book;
  @Column()
  borrowDate: Date;

  @Column({ nullable: true })
  returnDate: Date;
  
  @Column({ nullable: true })
  fine: number;
}

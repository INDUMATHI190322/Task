import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('librarians')
export class Librarian {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  // @Column()
  // password: string; // Encrypted in a real app
}

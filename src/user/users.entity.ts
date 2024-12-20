import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from 'src/transaction/transactions.entity';
import { Fine } from 'src/fine/fine.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user,{ eager: true })
  transactions: Transaction[];

  @OneToMany(() => Fine, (fine) => fine.user, { eager: true })
  fines: Fine[];
}

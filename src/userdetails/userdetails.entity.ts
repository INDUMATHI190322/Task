import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from 'src/transaction/transactions.entity';
import { Fine } from 'src/fine/fine.entity';

@Entity()
export class Userdetails {
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

  @OneToMany(() => Transaction, (transaction) => transaction.user, { cascade: true })
  transactions: Transaction[];

  @OneToMany(() => Fine, (fine) => fine.user, { cascade: true })
  fines: Fine[];
}

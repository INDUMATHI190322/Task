// fine.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './users.entity';

@Entity('fines')
export class Fine {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.fines)
  user: User;

  @Column()
  fineAmount: number;

  @Column()
  reason: string;

  @Column({ type: 'date' })
  date: Date;
}

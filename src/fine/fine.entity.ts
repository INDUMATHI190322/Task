import { Entity, Column, PrimaryGeneratedColumn, ManyToOne ,JoinColumn} from 'typeorm';
import { User } from 'src/user/users.entity';

@Entity()
export class Fine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('decimal')
  fineAmount: number;

  @Column()
  paid: boolean;

  @ManyToOne(() => User, (user) => user.fines)
  user: User;
}
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { User } from 'src/user/users.entity';

// @Entity()
// export class Fine {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => User, user => user.fines)
//   user: User;

//   @Column()
//   description: string;

//   @Column('decimal')
//   fineAmount: number;

//   @Column()
//   paid: boolean;
//   @Column() // Adjust type as per your schema
// status: string;

// }

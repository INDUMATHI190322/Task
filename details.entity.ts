import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class details {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', nullable: false })
    Name: string;

    @Column()
    Password: string;

    @Column()
    Occupation: string;

    @Column()
    country: string;
}
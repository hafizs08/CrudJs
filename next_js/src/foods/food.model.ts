import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from '../transactions/transaction.model';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  food_id: number;

  @Column()
  food_name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @OneToMany(() => Transaction, (transaction) => transaction.food)
  transactions: Transaction[];
}

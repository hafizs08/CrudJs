import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../customers/customer.model';
import { Food } from '../foods/food.model';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  @Column()
  qty: number;

  @Column()
  total_price: number;

  @Column()
  transaction_date: Date;

  @ManyToOne(() => Customer, (customer) => customer.transactions)
  customer: Customer;

  @ManyToOne(() => Food, (food) => food.transactions)
  food: Food;
}

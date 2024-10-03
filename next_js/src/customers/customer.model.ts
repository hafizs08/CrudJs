import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from '../transactions/transaction.model';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @OneToMany(() => Transaction, (transaction) => transaction.customer)
  transactions: Transaction[];
}

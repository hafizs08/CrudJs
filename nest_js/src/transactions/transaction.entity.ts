import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { Food } from '../foods/food.entity';

@Entity('transaction')  // Nama tabel yang sudah ada
export class Transaction {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })  // Nama kolom foreign key sesuai dengan yang ada di tabel
  customer: Customer;

  @ManyToOne(() => Food)
  @JoinColumn({ name: 'food_id' })  // Nama kolom foreign key sesuai dengan yang ada di tabel
  food: Food;

  @Column()
  qty: number;

  @Column()
  total_price: number;

  @Column()
  transaction_date: Date;
}

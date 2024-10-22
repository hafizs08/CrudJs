import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer')  // Nama tabel yang sudah ada
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;
}

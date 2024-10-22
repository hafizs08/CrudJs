import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('food')  // Nama tabel yang sudah ada
export class Food {
  @PrimaryGeneratedColumn()
  food_id: number;

  @Column()
  food_name: string;

  @Column()
  price: number;

  @Column()
  stock: number;
}

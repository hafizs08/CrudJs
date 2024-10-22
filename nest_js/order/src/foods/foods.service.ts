import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './food.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private foodsRepository: Repository<Food>,
  ) {}

  findAll(): Promise<Food[]> {
    return this.foodsRepository.find();
  }

  findOne(id: number): Promise<Food> {
    return this.foodsRepository.findOneBy({ food_id: id });
  }

  create(food: Food): Promise<Food> {
    return this.foodsRepository.save(food);
  }

  async update(id: number, food: Food): Promise<void> {
    await this.foodsRepository.update(id, food);
  }

  async remove(id: number): Promise<void> {
    await this.foodsRepository.delete(id);
  }
}

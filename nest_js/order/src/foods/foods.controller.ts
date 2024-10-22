import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Food } from './food.entity';
import { FoodsService } from './foods.service';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  findAll() {
    return this.foodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.foodsService.findOne(id);
  }

  @Post()
  create(@Body() food: Food) {
    return this.foodsService.create(food);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() food: Food) {
    return this.foodsService.update(id, food);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.foodsService.remove(id);
  }
}

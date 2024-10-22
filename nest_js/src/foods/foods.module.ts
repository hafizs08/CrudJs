import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './food.entity';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';

@Module({
  imports: [TypeOrmModule.forFeature([Food])],
  providers: [FoodsService],
  controllers: [FoodsController],
})
export class FoodsModule {}

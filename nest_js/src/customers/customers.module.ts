import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity'; // Pastikan entity diimport
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])], // Pastikan ini ada
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customersService.findOne(id);
  }

  @Post()
  create(@Body() customer: Customer) {
    return this.customersService.create(customer);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() customer: Customer) {
    return this.customersService.update(id, customer);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customersService.remove(id);
  }
}

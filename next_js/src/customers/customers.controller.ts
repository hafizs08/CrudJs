import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.model';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getAllCustomers(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  getCustomerById(@Param('id') id: number): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  @Post()
  createCustomer(@Body() customer: Customer): Promise<Customer> {
    return this.customerService.create(customer);
  }

  @Put(':id')
  updateCustomer(@Param('id') id: number, @Body() customer: Partial<Customer>): Promise<void> {
    return this.customerService.update(id, customer);
  }

  @Delete(':id')
  deleteCustomer(@Param('id') id: number): Promise<void> {
    return this.customerService.remove(id);
  }
}

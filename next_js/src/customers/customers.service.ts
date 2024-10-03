import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.model';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  findOne(id: number): Promise<Customer> {
    return this.customerRepository.findOne({ where: { customer_id: id } });
  }

  create(customer: Customer): Promise<Customer> {
    return this.customerRepository.save(customer);
  }

  async update(id: number, customer: Partial<Customer>): Promise<void> {
    await this.customerRepository.update(id, customer);
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}

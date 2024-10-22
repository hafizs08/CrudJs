import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  findOne(id: number): Promise<Customer> {
    return this.customersRepository.findOneBy({ customer_id: id });
  }

  create(customer: Customer): Promise<Customer> {
    return this.customersRepository.save(customer);
  }

  async update(id: number, customer: Customer): Promise<void> {
    await this.customersRepository.update(id, customer);
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }
}

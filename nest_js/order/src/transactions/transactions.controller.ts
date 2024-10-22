import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.transactionsService.findOne(id);
  }

  @Post()
  create(@Body() transaction: Transaction) {
    return this.transactionsService.create(transaction);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() transaction: Transaction) {
    return this.transactionsService.update(id, transaction);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.transactionsService.remove(id);
  }
}

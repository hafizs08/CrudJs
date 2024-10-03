// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CustomersModule } from './customers/customers.module';
// import { FoodsModule } from './foods/foods.module';
// import { TransactionsModule } from './transactions/transactions.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: 'admin',
//       database: 'order',
//       autoLoadEntities: true,
//       synchronize: true, // Set to false in production
//     }),
//     CustomersModule,
//     FoodsModule,
//     TransactionsModule,
//   ],
// })
// export class AppModule {}

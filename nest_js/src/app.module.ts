import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { FoodsModule } from './foods/foods.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    // Load ConfigModule for .env support
    ConfigModule.forRoot({
      isGlobal: true,  // Make configuration available globally
    }),

    // Configure TypeOrmModule with environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,  // Disable synchronize for production
      }),
      inject: [ConfigService],
    }),
    CustomersModule,
    FoodsModule,
    TransactionsModule,
  ],
})
export class AppModule {}

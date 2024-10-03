import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin', // sesuaikan dengan password database
  database: 'order',
  autoLoadModels: true,
  synchronize: true, // set false untuk produksi
};

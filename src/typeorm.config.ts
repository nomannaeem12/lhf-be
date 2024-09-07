import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'lhf_db',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/**/migrations/*.js'],
});

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'lhf_db',
  synchronize: false,
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
};

import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['**/entities/*.{js,ts}'],
  migrations: ['**/migrations/*.{js,ts}']
});
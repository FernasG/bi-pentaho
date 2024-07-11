import { DataSource } from 'typeorm';
import { Users, Address } from '../database';
import { faker } from '@faker-js/faker/locale/pt_BR';

export class UsersService {
  public async run(datasource: DataSource, size: number = 1000) {
    console.log('Start inserting Users.');

    for (let i = 0; i < size; i++) {
      const user: Partial<Users> = {
        email: faker.internet.email(),
        fullname: faker.person.fullName(),
        birthdate: faker.date.birthdate(),
        password: faker.internet.password()
      }

      const address: Partial<Address> = {
        city: faker.location.city(),
        state: faker.location.state(),
        street: faker.location.state(),
        country: faker.location.country(),
        zip_code: faker.location.zipCode()
      }

      const insertUser = await datasource
        .getRepository(Users)
        .insert(user);

      if (!insertUser) continue;

      const { identifiers: [{ id }] } = insertUser;

      const insertAddress = await datasource
        .getRepository(Address)
        .insert({ user_id: id, ...address });

      if (!insertAddress) continue;
    }

    console.log('Completed inserting Users.');
  }
}
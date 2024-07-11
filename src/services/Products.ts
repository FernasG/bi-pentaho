import { DataSource } from 'typeorm';
import { Categories, Products, ProductsCategories } from '../database';
import { faker } from '@faker-js/faker/locale/pt_BR';

export class ProductsService {
  public async run(datasource: DataSource, size: number = 50) {
    console.log('Start inserting Products.');

    const categories = await datasource
      .getRepository(Categories)
      .find({ select: ['id'] });

    for (let i = 0; i < size; i++) {
      const product: Partial<Products> = {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        quantity: Number(faker.number.bigInt({ min: 1, max: 300 }))
      }

      const productInsert = await datasource
        .getRepository(Products)
        .insert(product);

      if (!productInsert) continue;

      const { identifiers: [{ id }] } = productInsert;

      const index = Math.floor(Math.random() * categories.length);
      const { id: categoryId } = categories[index];

      const productCategory = await datasource
        .getRepository(ProductsCategories)
        .insert({ category_id: categoryId, product_id: id });

      if (!productCategory) continue;
    }

    console.log('Completed inserting Products.');
  }
}
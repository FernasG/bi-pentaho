import { DataSource } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { Categories } from '../database';

export class CategoriesService {
  public async run(datasource: DataSource) {
    console.log('Start inserting Categories.');

    const categoriesFile = fs.readFileSync(path.join(__dirname, 'data', 'Categories.json'));

    if (!categoriesFile) return null;

    const categoriesBuffer: any[] = JSON.parse(categoriesFile.toString('utf-8'))

    const categories = categoriesBuffer
      .map(({ CategoryName, Description, ImageURL }) => ({ name: CategoryName, description: Description, image_url: ImageURL }));

    await datasource.getRepository(Categories).save(categories);

    console.log('Completed inserting Categories.');
  }
}
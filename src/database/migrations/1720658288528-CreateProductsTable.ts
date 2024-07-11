import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductsTable1720658288528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'products',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isUnique: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'name',
          type: 'varchar',
          length: '256'
        },
        {
          name: 'description',
          type: 'varchar',
          length: '256',
          isNullable: true
        },
        {
          name: 'quantity',
          type: 'integer',
          unsigned: true
        },
        {
          name: 'price',
          type: 'decimal',
          scale: 2,
          precision: 12,
          unsigned: true
        },
        {
          name: 'discontinued',
          type: 'boolean',
          default: true
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP'
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}

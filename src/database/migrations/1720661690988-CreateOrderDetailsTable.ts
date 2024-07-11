import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateOrderDetailsTable1720661690988 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'order_details',
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
          name: 'order_id',
          type: 'uuid'
        },
        {
          name: 'product_id',
          type: 'uuid'
        },
        {
          name: 'unit_price',
          type: 'decimal',
          scale: 2,
          precision: 12,
          unsigned: true
        },
        {
          name: 'quantity',
          type: 'integer'
        },
        {
          name: 'discount',
          type: 'decimal',
          scale: 2,
          precision: 12,
          unsigned: true
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
      ],
      foreignKeys: [
        new TableForeignKey({
          columnNames: ['order_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'orders',
          onDelete: 'CASCADE'
        }),
        new TableForeignKey({
          columnNames: ['product_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'products',
          onDelete: 'CASCADE'
        })
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_details');
  }
}

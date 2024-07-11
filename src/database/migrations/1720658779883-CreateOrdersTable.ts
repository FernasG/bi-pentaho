import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateOrdersTable1720658779883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orders',
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
          name: 'user_id',
          type: 'uuid'
        },
        {
          name: 'date',
          type: 'date'
        },
        {
          name: 'shipped_date',
          type: 'timestamp',
          isNullable: true
        },
        {
          name: 'freight',
          type: 'decimal',
          scale: 2,
          precision: 12,
          unsigned: true
        },
        {
          name: 'ship_name',
          type: 'varchar',
          length: '256'
        },
        {
          name: 'ship_address',
          type: 'varchar',
          length: '256'
        },
        {
          name: 'ship_city',
          type: 'varchar',
          length: '256'
        },
        {
          name: 'ship_state',
          type: 'varchar',
          length: '128'
        },
        {
          name: 'ship_zip_code',
          type: 'varchar',
          length: '32'
        },
        {
          name: 'ship_country',
          type: 'varchar',
          length: '128'
        },
        {
          name: 'status',
          type: 'enum',
          enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
          enumName: 'ORDER_STATUS',
          default: '\'pending\''
        },
        {
          name: 'total_price',
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
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE'
        })
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}

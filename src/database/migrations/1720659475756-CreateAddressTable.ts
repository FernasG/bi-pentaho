import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateAddressTable1720659475756 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'address',
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
          name: 'street',
          type: 'varchar',
          length: '256'
        },
        {
          name: 'city',
          type: 'varchar',
          length: '256'
        },
        {
          name: 'state',
          type: 'varchar',
          length: '128'
        },
        {
          name: 'zip_code',
          type: 'varchar',
          length: '32'
        },
        {
          name: 'country',
          type: 'varchar',
          length: '128'
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
    await queryRunner.dropTable('address');
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1720658274911 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
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
          name: 'fullname',
          type: 'varchar',
          length: '256'
        },
        {
          name: 'email',
          type: 'varchar',
          length: '128'
        },
        {
          name: 'birthdate',
          type: 'date'
        },
        {
          name: 'password',
          type: 'text'
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
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
          isNullable: true
        },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}

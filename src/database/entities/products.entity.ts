import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  description: string;

  @Column({ type: 'integer', unsigned: true })
  quantity: number;

  @Column({ type: 'decimal', scale: 2, precision: 12, unsigned: true })
  price: number;

  @Column({ type: 'boolean', default: true })
  discontinued: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
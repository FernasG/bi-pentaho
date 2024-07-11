import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'uuid' })
  order_id: string;

  @Column({ type: 'uuid' })
  product_id: string;

  @Column({ type: 'decimal', scale: 2, precision: 12, unsigned: true })
  unit_price: number;

  @Column({ type: 'integer', unsigned: true })
  quantity: number;

  @Column({ type: 'decimal', scale: 2, precision: 12, unsigned: true })
  discount: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
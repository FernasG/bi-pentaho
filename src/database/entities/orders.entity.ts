import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'timestamp', nullable: true })
  shipped_date: Date;

  @Column({ type: 'decimal', scale: 2, precision: 12, unsigned: true })
  freight: number;

  @Column({ type: 'varchar', length: '256' })
  ship_name: string;

  @Column({ type: 'varchar', length: '256' })
  ship_address: string;

  @Column({ type: 'varchar', length: '256' })
  ship_city: string;

  @Column({ type: 'varchar', length: '128' })
  ship_state: string;

  @Column({ type: 'varchar', length: '32' })
  ship_zip_code: string;

  @Column({ type: 'varchar', length: '128' })
  ship_country: string;

  @Column({ type: 'enum', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'] })
  status: string;

  @Column({ type: 'decimal', scale: 2, precision: 12, unsigned: true })
  total_price: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
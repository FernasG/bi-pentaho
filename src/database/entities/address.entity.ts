import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'varchar', length: 256 })
  street: string;

  @Column({ type: 'varchar', length: 256 })
  city: string;

  @Column({ type: 'varchar', length: 128 })
  state: string;

  @Column({ type: 'varchar', length: 32 })
  zip_code: string;

  @Column({ type: 'varchar', length: 128 })
  country: string;

  @OneToOne(() => Users, (user) => user.address)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 256 })
  fullname: string;

  @Column({ type: 'varchar', length: 128 })
  email: string;

  @Column({ type: 'date' })
  birthdate: Date;

  @Column({ type: 'text' })
  password: string;

  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
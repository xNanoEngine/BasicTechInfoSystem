import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('storages')
export class Storage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  manufacturer: string;

  @Column()
  type: string;

  @Column({ name: 'form_factor' })
  formFactor: string;

  @Column()
  interface: string;

  @Column('int')
  capacity: number;

  @Column('int', { name: 'read_speed', nullable: true })
  readSpeed: number;

  @Column('int', { name: 'write_speed', nullable: true })
  writeSpeed: number;

  @Column('int')
  price: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

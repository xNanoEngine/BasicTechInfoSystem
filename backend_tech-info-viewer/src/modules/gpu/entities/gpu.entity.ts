import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gpus')
export class Gpu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  manufacturer: string;

  @Column('int')
  vram: number;

  @Column('int')
  tdp: number;

  @Column('int')
  price: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('rams')
export class Ram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  manufacturer: string;

  @Column({ name: 'memory_type' })
  memoryType: string;

  @Column('int')
  capacity: number;

  @Column('int')
  speed: number;

  @Column('int')
  latency: number;

  @Column('int', { default: 1 })
  modules: number;

  @Column({ name: 'has_rgb', default: false })
  hasRgb: boolean;

  @Column('int')
  price: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

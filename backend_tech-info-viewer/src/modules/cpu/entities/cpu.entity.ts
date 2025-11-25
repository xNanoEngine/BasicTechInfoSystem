import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cpus')
export class Cpu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  manufacturer: string;

  @Column()
  socket: string;

  @Column('int')
  cores: number;

  @Column('int')
  threads: number;

  @Column('float', { name: 'base_clock' })
  baseClock: number;

  @Column('float', { name: 'boost_clock' })
  boostClock: number;

  @Column('int')
  tdp: number;

  @Column('int')
  price: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('motherboards')
export class Motherboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  manufacturer: string;

  @Column()
  socket: string;

  @Column()
  chipset: string;

  @Column({ name: 'form_factor' })
  formFactor: string;

  @Column({ name: 'memory_type' })
  memoryType: string;

  @Column({ name: 'memory_slots', type: 'int' })
  memorySlots: number;

  @Column({ name: 'm2_slots', type: 'int', default: 0 })
  m2Slots: number;

  @Column({ name: 'has_wifi', default: false })
  hasWifi: boolean;

  @Column('int')
  price: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

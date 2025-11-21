import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('psus')
export class Psu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  manufacturer: string;

  @Column('int')
  wattage: number;

  @Column()
  certification: string;

  @Column()
  modularity: string;

  @Column({ name: 'form_factor', default: 'ATX' })
  formFactor: string;

  @Column('int')
  price: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}

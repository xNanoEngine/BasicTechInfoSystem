import { Injectable } from '@nestjs/common';
import { CreateCpuDto } from './dto/create-cpu.dto';
import { UpdateCpuDto } from './dto/update-cpu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cpu } from './entities/cpu.entity';
import { Repository } from 'typeorm';
import { SearchDto } from '../search/dto/search.dto';

@Injectable()
export class CpuService {
  constructor(
    @InjectRepository(Cpu)
    private readonly cpuRepository: Repository<Cpu>,
  ) {}

  async create(createCpuDto: CreateCpuDto) {
    const newCpu = this.cpuRepository.create(createCpuDto);
    return await this.cpuRepository.save(newCpu);
  }

  async findAll() {
    return await this.cpuRepository.find();
  }

  async findOne(id: number) {
    return await this.cpuRepository.findOneBy({ id });
  }

  async update(id: number, updateCpuDto: UpdateCpuDto) {
    return await this.cpuRepository.update(id, updateCpuDto);
  }

  async remove(id: number) {
    return await this.cpuRepository.delete(id);
  }

  async searchAdvanced(filters: SearchDto) {
    if (filters.minVram) return [];
    if (filters.minWattage) return [];
    if (filters.memoryType) return [];
    const qb = this.cpuRepository.createQueryBuilder('cpu');

    if (filters.query) {
      qb.andWhere('(cpu.name ILIKE :term OR cpu.manufacturer ILIKE :term)', {
        term: `%${filters.query}%`,
      });
    }

    if (filters.brand)
      qb.andWhere('cpu.manufacturer ILIKE :brand', {
        brand: `%${filters.brand}%`,
      });
    if (filters.minPrice)
      qb.andWhere('cpu.price >= :min', { min: filters.minPrice });
    if (filters.maxPrice)
      qb.andWhere('cpu.price <= :max', { max: filters.maxPrice });

    if (filters.socket) {
      qb.andWhere('cpu.socket ILIKE :socket', {
        socket: `%${filters.socket}%`,
      });
    }

    if (filters.sort === 'ASC' || filters.sort === 'DESC') {
      qb.orderBy('cpu.price', filters.sort);
    }

    return await qb.getMany();
  }
}

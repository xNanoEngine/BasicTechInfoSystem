import { Injectable } from '@nestjs/common';
import { CreateRamDto } from './dto/create-ram.dto';
import { UpdateRamDto } from './dto/update-ram.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ram } from './entities/ram.entity';
import { Repository } from 'typeorm';
import { SearchDto } from '../search/dto/search.dto';

@Injectable()
export class RamService {
  constructor(
    @InjectRepository(Ram)
    private readonly ramRepository: Repository<Ram>,
  ) {}

  async create(createRamDto: CreateRamDto) {
    const newRam = this.ramRepository.create(createRamDto);
    return await this.ramRepository.save(newRam);
  }

  async findAll() {
    return await this.ramRepository.find();
  }

  async findOne(id: number) {
    return await this.ramRepository.findOneBy({ id });
  }

  async update(id: number, updateRamDto: UpdateRamDto) {
    return await this.ramRepository.update(id, updateRamDto);
  }

  async remove(id: number) {
    return await this.ramRepository.delete(id);
  }

  async searchAdvanced(filters: SearchDto) {
    if (filters.socket) return [];
    if (filters.minVram) return [];
    if (filters.minWattage) return [];
    const qb = this.ramRepository.createQueryBuilder('ram');

    if (filters.query) {
      qb.andWhere('(ram.name ILIKE :term OR ram.manufacturer ILIKE :term)', {
        term: `%${filters.query}%`,
      });
    }
    if (filters.brand)
      qb.andWhere('ram.manufacturer ILIKE :brand', {
        brand: `%${filters.brand}%`,
      });
    if (filters.minPrice)
      qb.andWhere('ram.price >= :min', { min: filters.minPrice });
    if (filters.maxPrice)
      qb.andWhere('ram.price <= :max', { max: filters.maxPrice });

    if (filters.memoryType) {
      qb.andWhere('ram.memoryType ILIKE :memType', {
        memType: `%${filters.memoryType}%`,
      });
    }

    if (filters.sort === 'ASC' || filters.sort === 'DESC') {
      qb.orderBy('ram.price', filters.sort);
    }

    return await qb.getMany();
  }
}

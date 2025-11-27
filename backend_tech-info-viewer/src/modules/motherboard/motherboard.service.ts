import { Injectable } from '@nestjs/common';
import { CreateMotherboardDto } from './dto/create-motherboard.dto';
import { UpdateMotherboardDto } from './dto/update-motherboard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Motherboard } from './entities/motherboard.entity';
import { Repository } from 'typeorm';
import { SearchDto } from '../search/dto/search.dto';

@Injectable()
export class MotherboardService {
  constructor(
    @InjectRepository(Motherboard)
    private readonly motherboardRepository: Repository<Motherboard>,
  ) {}

  async create(createMotherboardDto: CreateMotherboardDto) {
    const newMotherboard =
      this.motherboardRepository.create(createMotherboardDto);
    return await this.motherboardRepository.save(newMotherboard);
  }

  async findAll() {
    return this.motherboardRepository.find();
  }

  async findOne(id: number) {
    return this.motherboardRepository.findOneBy({ id });
  }

  async update(id: number, updateMotherboardDto: UpdateMotherboardDto) {
    return this.motherboardRepository.update(id, updateMotherboardDto);
  }

  async remove(id: number) {
    return this.motherboardRepository.delete(id);
  }

  async searchAdvanced(filters: SearchDto) {
    if (filters.minVram) return [];
    if (filters.minWattage) return [];
    const qb = this.motherboardRepository.createQueryBuilder('mobo');

    if (filters.query) {
      qb.andWhere(
        '(mobo.name ILIKE :term OR mobo.chipset ILIKE :term OR mobo.manufacturer ILIKE :term)',
        {
          term: `%${filters.query}%`,
        },
      );
    }

    if (filters.brand)
      qb.andWhere('mobo.manufacturer ILIKE :brand', {
        brand: `%${filters.brand}%`,
      });
    if (filters.minPrice)
      qb.andWhere('mobo.price >= :min', { min: filters.minPrice });
    if (filters.maxPrice)
      qb.andWhere('mobo.price <= :max', { max: filters.maxPrice });

    // Específico 1: Socket
    if (filters.socket) {
      qb.andWhere('mobo.socket ILIKE :socket', {
        socket: `%${filters.socket}%`,
      });
    }
    if (filters.memoryType) {
      qb.andWhere('mobo.memoryType ILIKE :memType', {
        memType: `%${filters.memoryType}%`,
      });
    }

    if (filters.sort === 'ASC' || filters.sort === 'DESC') {
      qb.orderBy('mobo.price', filters.sort);
    }

    return await qb.getMany();
  }
}

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

  async findAll(params?: SearchDto) {
    const { page = 1, limit = 20, sort, query, brand, minPrice, maxPrice, memoryType } = params || {};
    const qb = this.ramRepository.createQueryBuilder('ram');

    if (query) {
      qb.andWhere('(ram.name ILIKE :term OR ram.manufacturer ILIKE :term)', {
        term: `%${query}%`,
      });
    }
    if (brand) {
      qb.andWhere('ram.manufacturer ILIKE :brand', { brand: `%${brand}%` });
    }

    if (minPrice) {
      qb.andWhere('ram.price >= :min', { min: minPrice });
    }

    if (maxPrice) {
      qb.andWhere('ram.price <= :max', { max: maxPrice });
    }

    if (memoryType) {
      qb.andWhere('ram.memoryType ILIKE :memType', {
        memType: `%${memoryType}%`,
      });
    }

    if (sort === 'ASC' || sort === 'DESC') {
      qb.orderBy('ram.price', sort);
    } else if (sort === 'latest') {
      qb.orderBy('ram.id', 'DESC');
    }

    const total = await qb.getCount();
    
    qb.skip((page - 1) * limit).take(limit);

    const data = await qb.getMany();

    return {
      metadata: {
        totalResults: total,
        currentPage: page,
        perPage: limit,
        totalPages: Math.ceil(total / limit),
      },
      data: data.map(item => ({ ...item, type: 'ram', category: 'Memorias RAM' })),
    };
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
    return (await this.findAll(filters)).data;
  }
}

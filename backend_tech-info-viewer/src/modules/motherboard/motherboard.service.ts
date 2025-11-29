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

  async findAll(params?: SearchDto) {
    const { page = 1, limit = 20, sort, query, brand, minPrice, maxPrice, socket, memoryType } = params || {};
    const qb = this.motherboardRepository.createQueryBuilder('mobo');

    if (query) {
      qb.andWhere(
        '(mobo.name ILIKE :term OR mobo.chipset ILIKE :term OR mobo.manufacturer ILIKE :term)',
        {
          term: `%${query}%`,
        },
      );
    }

    if (brand) {
      qb.andWhere('mobo.manufacturer ILIKE :brand', { brand: `%${brand}%` });
    }

    if (minPrice) {
      qb.andWhere('mobo.price >= :min', { min: minPrice });
    }

    if (maxPrice) {
      qb.andWhere('mobo.price <= :max', { max: maxPrice });
    }

    if (socket) {
      qb.andWhere('mobo.socket ILIKE :socket', { socket: `%${socket}%` });
    }

    if (memoryType) {
      qb.andWhere('mobo.memoryType ILIKE :memType', { memType: `%${memoryType}%` });
    }

    if (sort === 'ASC' || sort === 'DESC') {
      qb.orderBy('mobo.price', sort);
    } else if (sort === 'latest') {
      qb.orderBy('mobo.id', 'DESC');
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
      data: data.map(item => ({ ...item, type: 'motherboard', category: 'Placas Madre' })),
    };
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
    return (await this.findAll(filters)).data;
  }
}

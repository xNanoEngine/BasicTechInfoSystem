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

  async findAll(params?: SearchDto) {
    const { page = 1, limit = 20, sort, query, brand, minPrice, maxPrice, socket } = params || {};
    const qb = this.cpuRepository.createQueryBuilder('cpu');

    if (query) {
      qb.andWhere('(cpu.name ILIKE :term OR cpu.manufacturer ILIKE :term)', {
        term: `%${query}%`,
      });
    }

    if (brand) {
      qb.andWhere('cpu.manufacturer ILIKE :brand', { brand: `%${brand}%` });
    }

    if (minPrice) {
      qb.andWhere('cpu.price >= :min', { min: minPrice });
    }

    if (maxPrice) {
      qb.andWhere('cpu.price <= :max', { max: maxPrice });
    }

    if (socket) {
      qb.andWhere('cpu.socket ILIKE :socket', { socket: `%${socket}%` });
    }

    if (sort === 'ASC' || sort === 'DESC') {
      qb.orderBy('cpu.price', sort);
    } else if (sort === 'latest') {
      qb.orderBy('cpu.id', 'DESC'); // Assuming ID is auto-increment, or use createdAt if available
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
      data: data.map(item => ({ ...item, type: 'cpu', category: 'Procesadores' })),
    };
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

  // Kept for compatibility if needed, but findAll is preferred
  async searchAdvanced(filters: SearchDto) {
    return (await this.findAll(filters)).data;
  }
}

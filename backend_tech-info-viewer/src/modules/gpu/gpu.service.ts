import { Injectable } from '@nestjs/common';
import { CreateGpuDto } from './dto/create-gpu.dto';
import { UpdateGpuDto } from './dto/update-gpu.dto';
import { Gpu } from './entities/gpu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchDto } from '../search/dto/search.dto';

@Injectable()
export class GpuService {
  constructor(
    @InjectRepository(Gpu)
    private readonly gpuRepository: Repository<Gpu>,
  ) {}

  async create(createGpuDto: CreateGpuDto) {
    const newGpu = this.gpuRepository.create(createGpuDto);
    return await this.gpuRepository.save(newGpu);
  }

  async findAll(params?: SearchDto) {
    const { page = 1, limit = 20, sort, query, brand, minPrice, maxPrice, minVram } = params || {};
    const qb = this.gpuRepository.createQueryBuilder('gpu');

    if (query) {
      qb.andWhere('(gpu.name ILIKE :term OR gpu.manufacturer ILIKE :term)', {
        term: `%${query}%`,
      });
    }

    if (brand) {
      qb.andWhere('gpu.manufacturer ILIKE :brand', { brand: `%${brand}%` });
    }

    if (minPrice) {
      qb.andWhere('gpu.price >= :min', { min: minPrice });
    }

    if (maxPrice) {
      qb.andWhere('gpu.price <= :max', { max: maxPrice });
    }

    if (minVram) {
      qb.andWhere('gpu.vram >= :vram', { vram: minVram });
    }

    if (sort === 'ASC' || sort === 'DESC') {
      qb.orderBy('gpu.price', sort);
    } else if (sort === 'latest') {
      qb.orderBy('gpu.id', 'DESC');
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
      data: data.map(item => ({ ...item, type: 'gpu', category: 'Tarjetas de Video' })),
    };
  }

  async findOne(id: number) {
    return await this.gpuRepository.findOneBy({ id });
  }

  async update(id: number, updateGpuDto: UpdateGpuDto) {
    return await this.gpuRepository.update(id, updateGpuDto);
  }

  async remove(id: number) {
    return await this.gpuRepository.delete(id);
  }

  async searchAdvanced(filters: SearchDto) {
    return (await this.findAll(filters)).data;
  }
}

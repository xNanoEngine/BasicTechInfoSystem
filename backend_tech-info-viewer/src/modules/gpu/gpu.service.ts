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

  async findAll() {
    return await this.gpuRepository.find();
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
    if (filters.socket) return []; // GPUs no van en el socket del CPU
    if (filters.minWattage) return []; // GPUs no son Fuentes
    if (filters.memoryType) return []; // GPUs usan GDDR, no DDR de sistema
    const qb = this.gpuRepository.createQueryBuilder('gpu');
    if (filters.query) {
      qb.andWhere('(gpu.name ILIKE :term OR gpu.manufacturer ILIKE :term)', {
        term: `%${filters.query}%`,
      });
    }

    if (filters.brand)
      qb.andWhere('gpu.manufacturer ILIKE :brand', {
        brand: `%${filters.brand}%`,
      });
    if (filters.minPrice)
      qb.andWhere('gpu.price >= :min', { min: filters.minPrice });
    if (filters.maxPrice)
      qb.andWhere('gpu.price <= :max', { max: filters.maxPrice });

    if (filters.minVram) {
      qb.andWhere('gpu.vram >= :vram', { vram: filters.minVram });
    }

    if (filters.sort === 'ASC' || filters.sort === 'DESC') {
      qb.orderBy('gpu.price', filters.sort);
    }

    return await qb.getMany();
  }
}

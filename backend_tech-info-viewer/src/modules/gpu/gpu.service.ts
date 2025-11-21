import { Injectable } from '@nestjs/common';
import { CreateGpuDto } from './dto/create-gpu.dto';
import { UpdateGpuDto } from './dto/update-gpu.dto';
import { Gpu } from './entities/gpu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
}

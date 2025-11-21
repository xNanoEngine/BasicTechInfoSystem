import { Injectable } from '@nestjs/common';
import { CreateCpuDto } from './dto/create-cpu.dto';
import { UpdateCpuDto } from './dto/update-cpu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cpu } from './entities/cpu.entity';
import { Repository } from 'typeorm';

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
}

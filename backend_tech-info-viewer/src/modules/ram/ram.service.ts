import { Injectable } from '@nestjs/common';
import { CreateRamDto } from './dto/create-ram.dto';
import { UpdateRamDto } from './dto/update-ram.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ram } from './entities/ram.entity';
import { Repository } from 'typeorm';

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
}

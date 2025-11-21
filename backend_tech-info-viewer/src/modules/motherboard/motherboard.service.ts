import { Injectable } from '@nestjs/common';
import { CreateMotherboardDto } from './dto/create-motherboard.dto';
import { UpdateMotherboardDto } from './dto/update-motherboard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Motherboard } from './entities/motherboard.entity';
import { Repository } from 'typeorm';

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
}

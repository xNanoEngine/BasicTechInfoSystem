import { Injectable } from '@nestjs/common';
import { CreatePsuDto } from './dto/create-psu.dto';
import { UpdatePsuDto } from './dto/update-psu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Psu } from './entities/psu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PsuService {
  constructor(
    @InjectRepository(Psu)
    private readonly psuRepository: Repository<Psu>,
  ) {}

  async create(createPsuDto: CreatePsuDto) {
    const newPsu = this.psuRepository.create(createPsuDto);
    return await this.psuRepository.save(newPsu);
  }

  async findAll() {
    return await this.psuRepository.find();
  }

  async findOne(id: number) {
    return await this.psuRepository.findOneBy({ id });
  }

  async update(id: number, updatePsuDto: UpdatePsuDto) {
    return await this.psuRepository.update(id, updatePsuDto);
  }

  async remove(id: number) {
    return await this.psuRepository.delete(id);
  }
}

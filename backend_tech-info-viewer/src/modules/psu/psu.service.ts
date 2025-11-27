import { Injectable } from '@nestjs/common';
import { CreatePsuDto } from './dto/create-psu.dto';
import { UpdatePsuDto } from './dto/update-psu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Psu } from './entities/psu.entity';
import { Repository } from 'typeorm';
import { SearchDto } from '../search/dto/search.dto';

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

  async searchAdvanced(filters: SearchDto) {
    if (filters.socket) return [];
    if (filters.minVram) return [];
    if (filters.memoryType) return [];
    const qb = this.psuRepository.createQueryBuilder('psu');

    if (filters.query) {
      qb.andWhere(
        '(psu.name ILIKE :term OR psu.manufacturer ILIKE :term OR psu.certification ILIKE :term)',
        { term: `%${filters.query}%` },
      );
    }

    if (filters.brand)
      qb.andWhere('psu.manufacturer ILIKE :brand', {
        brand: `%${filters.brand}%`,
      });
    if (filters.minPrice)
      qb.andWhere('psu.price >= :min', { min: filters.minPrice });
    if (filters.maxPrice)
      qb.andWhere('psu.price <= :max', { max: filters.maxPrice });
    if (filters.minWattage) {
      qb.andWhere('psu.wattage >= :watts', { watts: filters.minWattage });
    }

    if (filters.sort === 'ASC' || filters.sort === 'DESC') {
      qb.orderBy('psu.price', filters.sort);
    }

    return await qb.getMany();
  }
}

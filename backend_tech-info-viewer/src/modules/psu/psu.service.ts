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

  async findAll(params?: SearchDto) {
    const { page = 1, limit = 20, sort, query, brand, minPrice, maxPrice, minWattage } = params || {};
    const qb = this.psuRepository.createQueryBuilder('psu');

    if (query) {
      qb.andWhere(
        '(psu.name ILIKE :term OR psu.manufacturer ILIKE :term OR psu.certification ILIKE :term)',
        { term: `%${query}%` },
      );
    }

    if (brand) {
      qb.andWhere('psu.manufacturer ILIKE :brand', { brand: `%${brand}%` });
    }

    if (minPrice) {
      qb.andWhere('psu.price >= :min', { min: minPrice });
    }

    if (maxPrice) {
      qb.andWhere('psu.price <= :max', { max: maxPrice });
    }

    if (minWattage) {
      qb.andWhere('psu.wattage >= :watts', { watts: minWattage });
    }

    if (sort === 'ASC' || sort === 'DESC') {
      qb.orderBy('psu.price', sort);
    } else if (sort === 'latest') {
      qb.orderBy('psu.id', 'DESC');
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
      data: data.map(item => ({ ...item, type: 'psu', category: 'Fuentes de Poder' })),
    };
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
    return (await this.findAll(filters)).data;
  }
}

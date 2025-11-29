import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from './entities/storage.entity';
import { Repository } from 'typeorm';
import { SearchDto } from '../search/dto/search.dto';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>,
  ) {}

  async create(createStorageDto: CreateStorageDto) {
    const newStorage = this.storageRepository.create(createStorageDto);
    return await this.storageRepository.save(newStorage);
  }

  async findAll(params?: SearchDto) {
    const { page = 1, limit = 20, sort, query, brand, minPrice, maxPrice } = params || {};
    const qb = this.storageRepository.createQueryBuilder('storage');

    if (query) {
      qb.andWhere('(storage.name ILIKE :term OR storage.type ILIKE :term)', {
        term: `%${query}%`,
      });
    }

    if (brand) {
      qb.andWhere('storage.manufacturer ILIKE :brand', { brand: `%${brand}%` });
    }

    if (minPrice) {
      qb.andWhere('storage.price >= :min', { min: minPrice });
    }

    if (maxPrice) {
      qb.andWhere('storage.price <= :max', { max: maxPrice });
    }

    if (sort === 'ASC' || sort === 'DESC') {
      qb.orderBy('storage.price', sort);
    } else if (sort === 'latest') {
      qb.orderBy('storage.id', 'DESC');
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
      data: data.map(item => ({ ...item, type: 'storage', category: 'Almacenamiento' })),
    };
  }

  async findOne(id: number) {
    return await this.storageRepository.findOneBy({ id });
  }

  async update(id: number, updateStorageDto: UpdateStorageDto) {
    return await this.storageRepository.update(id, updateStorageDto);
  }

  async remove(id: number) {
    return await this.storageRepository.delete(id);
  }

  async searchAdvanced(filters: SearchDto) {
    return (await this.findAll(filters)).data;
  }
}

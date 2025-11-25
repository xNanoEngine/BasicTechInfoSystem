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

  async findAll() {
    return await this.storageRepository.find();
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
    if (
      filters.socket ||
      filters.minVram ||
      filters.minWattage ||
      filters.memoryType
    ) {
      return [];
    }
    const qb = this.storageRepository.createQueryBuilder('storage');

    if (filters.query) {
      qb.andWhere('(storage.name ILIKE :term OR storage.type ILIKE :term)', {
        term: `%${filters.query}%`,
      });
    }

    if (filters.brand)
      qb.andWhere('storage.manufacturer ILIKE :brand', {
        brand: `%${filters.brand}%`,
      });
    if (filters.minPrice)
      qb.andWhere('storage.price >= :min', { min: filters.minPrice });
    if (filters.maxPrice)
      qb.andWhere('storage.price <= :max', { max: filters.maxPrice });

    if (filters.sort) qb.orderBy('storage.price', filters.sort);

    return await qb.getMany();
  }
}

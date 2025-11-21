import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from './entities/storage.entity';
import { Repository } from 'typeorm';

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
}

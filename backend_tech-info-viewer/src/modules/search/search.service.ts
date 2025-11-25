import { Injectable } from '@nestjs/common';
import { CpuService } from '../cpu/cpu.service';
import { GpuService } from '../gpu/gpu.service';
import { RamService } from '../ram/ram.service';
import { PsuService } from '../psu/psu.service';
import { MotherboardService } from '../motherboard/motherboard.service';
import { StorageService } from '../storage/storage.service';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class SearchService {
  constructor(
    private readonly cpuService: CpuService,
    private readonly gpuService: GpuService,
    private readonly ramService: RamService,
    private readonly psuService: PsuService,
    private readonly moboService: MotherboardService,
    private readonly storageService: StorageService,
  ) {}

  async searchGlobal(filters: SearchDto) {
    const page = filters.page || 1;
    const limit = filters.limit || 20;

    const [cpus, gpus, rams, psus, mobos, storages] = await Promise.all([
      this.cpuService.searchAdvanced(filters),
      this.gpuService.searchAdvanced(filters),
      this.ramService.searchAdvanced(filters),
      this.psuService.searchAdvanced(filters),
      this.moboService.searchAdvanced(filters),
      this.storageService.searchAdvanced(filters),
    ]);

    const allResults = [
      ...cpus.map((i) => ({ ...i, type: 'cpu', category: 'Procesadores' })),
      ...gpus.map((i) => ({
        ...i,
        type: 'gpu',
        category: 'Tarjetas de Video',
      })),
      ...rams.map((i) => ({ ...i, type: 'ram', category: 'Memorias RAM' })),
      ...psus.map((i) => ({ ...i, type: 'psu', category: 'Fuentes de Poder' })),
      ...mobos.map((i) => ({
        ...i,
        type: 'motherboard',
        category: 'Placas Madre',
      })),
      ...storages.map((i) => ({
        ...i,
        type: 'storage',
        category: 'Almacenamiento',
      })),
    ];
    if (filters.sort === 'ASC') {
      allResults.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'DESC') {
      allResults.sort((a, b) => b.price - a.price);
    } else {
      allResults.sort((a, b) => a.price - b.price);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = allResults.slice(startIndex, endIndex);
    return {
      metadata: {
        totalResults: allResults.length,
        currentPage: page,
        perPage: limit, // Informamos cuántos enviamos
        totalPages: Math.ceil(allResults.length / limit),
      },
      data: paginatedResults,
    };
  }
}

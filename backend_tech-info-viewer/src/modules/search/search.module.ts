import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

// Importamos todos los módulos donde están los datos
import { CpuModule } from '../cpu/cpu.module';
import { GpuModule } from '../gpu/gpu.module';
import { RamModule } from '../ram/ram.module';
import { PsuModule } from '../psu/psu.module';
import { MotherboardModule } from '../motherboard/motherboard.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    // Al importar el Módulo, tenemos acceso a sus Servicios exportados
    CpuModule,
    GpuModule,
    RamModule,
    PsuModule,
    MotherboardModule,
    StorageModule,
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}

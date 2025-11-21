import { Module } from '@nestjs/common';
import { GpuService } from './gpu.service';
import { GpuController } from './gpu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gpu } from './entities/gpu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gpu])],
  controllers: [GpuController],
  providers: [GpuService],
})
export class GpuModule {}

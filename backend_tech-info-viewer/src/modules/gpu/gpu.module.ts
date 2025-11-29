import { Module } from '@nestjs/common';
import { GpuService } from './gpu.service';
import { GpuController } from './gpu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gpu } from './entities/gpu.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Gpu]), AuthModule],
  controllers: [GpuController],
  providers: [GpuService],
  exports: [GpuService],
})
export class GpuModule {}

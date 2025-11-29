import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { CpuController } from './cpu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cpu } from './entities/cpu.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cpu]), AuthModule],
  controllers: [CpuController],
  providers: [CpuService],
  exports: [CpuService],
})
export class CpuModule {}

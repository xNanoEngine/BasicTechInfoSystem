import { Module } from '@nestjs/common';
import { MotherboardService } from './motherboard.service';
import { MotherboardController } from './motherboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motherboard } from './entities/motherboard.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Motherboard]), AuthModule],
  controllers: [MotherboardController],
  providers: [MotherboardService],
  exports: [MotherboardService],
})
export class MotherboardModule {}

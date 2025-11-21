import { Module } from '@nestjs/common';
import { RamService } from './ram.service';
import { RamController } from './ram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ram } from './entities/ram.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ram])],
  controllers: [RamController],
  providers: [RamService],
})
export class RamModule {}

import { Module } from '@nestjs/common';
import { RamService } from './ram.service';
import { RamController } from './ram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ram } from './entities/ram.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ram]), AuthModule],
  controllers: [RamController],
  providers: [RamService],
  exports: [RamService],
})
export class RamModule {}

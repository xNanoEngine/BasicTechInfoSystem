import { Module } from '@nestjs/common';
import { PsuService } from './psu.service';
import { PsuController } from './psu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Psu } from './entities/psu.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Psu]), AuthModule],
  controllers: [PsuController],
  providers: [PsuService],
  exports: [PsuService],
})
export class PsuModule {}

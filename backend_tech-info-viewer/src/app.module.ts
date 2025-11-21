import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GpuModule } from './modules/gpu/gpu.module';
import { CpuModule } from './modules/cpu/cpu.module';
import { DatabaseModule } from './database/database.module';
import { MotherboardModule } from './modules/motherboard/motherboard.module';
import { RamModule } from './modules/ram/ram.module';
import { PsuModule } from './modules/psu/psu.module';
import { StorageModule } from './modules/storage/storage.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DatabaseModule, GpuModule, CpuModule, MotherboardModule, RamModule, PsuModule, StorageModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

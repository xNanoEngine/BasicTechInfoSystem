import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { SearchDto } from '../search/dto/search.dto';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createStorageDto: CreateStorageDto) {
    return this.storageService.create(createStorageDto);
  }

  @Get()
  findAll(@Query() params: SearchDto) {
    return this.storageService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storageService.findOne(id);
  }
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStorageDto: UpdateStorageDto,
  ) {
    return this.storageService.update(id, updateStorageDto);
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.storageService.remove(id);
  }
}

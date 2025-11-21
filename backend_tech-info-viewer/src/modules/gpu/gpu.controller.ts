import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { GpuService } from './gpu.service';
import { CreateGpuDto } from './dto/create-gpu.dto';
import { UpdateGpuDto } from './dto/update-gpu.dto';

@Controller('gpu')
export class GpuController {
  constructor(private readonly gpuService: GpuService) {}

  @Post()
  create(@Body() createGpuDto: CreateGpuDto) {
    return this.gpuService.create(createGpuDto);
  }

  @Get()
  findAll() {
    return this.gpuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gpuService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGpuDto: UpdateGpuDto,
  ) {
    return this.gpuService.update(id, updateGpuDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gpuService.remove(id);
  }
}

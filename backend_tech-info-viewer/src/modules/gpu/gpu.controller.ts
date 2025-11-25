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
} from '@nestjs/common';
import { GpuService } from './gpu.service';
import { CreateGpuDto } from './dto/create-gpu.dto';
import { UpdateGpuDto } from './dto/update-gpu.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('gpu')
export class GpuController {
  constructor(private readonly gpuService: GpuService) {}
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGpuDto: UpdateGpuDto,
  ) {
    return this.gpuService.update(id, updateGpuDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gpuService.remove(id);
  }
}

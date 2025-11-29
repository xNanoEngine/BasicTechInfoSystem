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
import { GpuService } from './gpu.service';
import { CreateGpuDto } from './dto/create-gpu.dto';
import { UpdateGpuDto } from './dto/update-gpu.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { SearchDto } from '../search/dto/search.dto';

@Controller('gpu')
export class GpuController {
  constructor(private readonly gpuService: GpuService) {}
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createGpuDto: CreateGpuDto) {
    return this.gpuService.create(createGpuDto);
  }

  @Get()
  findAll(@Query() params: SearchDto) {
    return this.gpuService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gpuService.findOne(id);
  }
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGpuDto: UpdateGpuDto,
  ) {
    return this.gpuService.update(id, updateGpuDto);
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gpuService.remove(id);
  }
}

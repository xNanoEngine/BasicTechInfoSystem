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
import { CpuService } from './cpu.service';
import { CreateCpuDto } from './dto/create-cpu.dto';
import { UpdateCpuDto } from './dto/update-cpu.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { SearchDto } from '../search/dto/search.dto';

@Controller('cpu')
export class CpuController {
  constructor(private readonly cpuService: CpuService) {}
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createCpuDto: CreateCpuDto) {
    return this.cpuService.create(createCpuDto);
  }

  @Get()
  findAll(@Query() params: SearchDto) {
    return this.cpuService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cpuService.findOne(+id);
  }
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCpuDto: UpdateCpuDto,
  ) {
    return this.cpuService.update(+id, updateCpuDto);
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cpuService.remove(id);
  }
}

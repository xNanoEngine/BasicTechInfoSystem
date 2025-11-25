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
import { CpuService } from './cpu.service';
import { CreateCpuDto } from './dto/create-cpu.dto';
import { UpdateCpuDto } from './dto/update-cpu.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('cpu')
export class CpuController {
  constructor(private readonly cpuService: CpuService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCpuDto: CreateCpuDto) {
    return this.cpuService.create(createCpuDto);
  }

  @Get()
  findAll() {
    return this.cpuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cpuService.findOne(+id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCpuDto: UpdateCpuDto,
  ) {
    return this.cpuService.update(+id, updateCpuDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cpuService.remove(id);
  }
}

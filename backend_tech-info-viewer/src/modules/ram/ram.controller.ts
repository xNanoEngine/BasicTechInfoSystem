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
import { RamService } from './ram.service';
import { CreateRamDto } from './dto/create-ram.dto';
import { UpdateRamDto } from './dto/update-ram.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { SearchDto } from '../search/dto/search.dto';

@Controller('ram')
export class RamController {
  constructor(private readonly ramService: RamService) {}
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createRamDto: CreateRamDto) {
    return this.ramService.create(createRamDto);
  }

  @Get()
  findAll(@Query() params: SearchDto) {
    return this.ramService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ramService.findOne(id);
  }
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRamDto: UpdateRamDto,
  ) {
    return this.ramService.update(id, updateRamDto);
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ramService.remove(id);
  }
}

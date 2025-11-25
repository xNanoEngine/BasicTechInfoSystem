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
import { RamService } from './ram.service';
import { CreateRamDto } from './dto/create-ram.dto';
import { UpdateRamDto } from './dto/update-ram.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('ram')
export class RamController {
  constructor(private readonly ramService: RamService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createRamDto: CreateRamDto) {
    return this.ramService.create(createRamDto);
  }

  @Get()
  findAll() {
    return this.ramService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ramService.findOne(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRamDto: UpdateRamDto,
  ) {
    return this.ramService.update(id, updateRamDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ramService.remove(id);
  }
}

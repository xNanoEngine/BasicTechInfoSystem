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
import { MotherboardService } from './motherboard.service';
import { CreateMotherboardDto } from './dto/create-motherboard.dto';
import { UpdateMotherboardDto } from './dto/update-motherboard.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('motherboard')
export class MotherboardController {
  constructor(private readonly motherboardService: MotherboardService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createMotherboardDto: CreateMotherboardDto) {
    return this.motherboardService.create(createMotherboardDto);
  }

  @Get()
  findAll() {
    return this.motherboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.motherboardService.findOne(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMotherboardDto: UpdateMotherboardDto,
  ) {
    return this.motherboardService.update(id, updateMotherboardDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.motherboardService.remove(id);
  }
}

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
import { PsuService } from './psu.service';
import { CreatePsuDto } from './dto/create-psu.dto';
import { UpdatePsuDto } from './dto/update-psu.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('psu')
export class PsuController {
  constructor(private readonly psuService: PsuService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPsuDto: CreatePsuDto) {
    return this.psuService.create(createPsuDto);
  }

  @Get()
  findAll() {
    return this.psuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.psuService.findOne(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePsuDto: UpdatePsuDto,
  ) {
    return this.psuService.update(id, updatePsuDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.psuService.remove(id);
  }
}

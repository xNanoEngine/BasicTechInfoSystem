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
import { PsuService } from './psu.service';
import { CreatePsuDto } from './dto/create-psu.dto';
import { UpdatePsuDto } from './dto/update-psu.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { SearchDto } from '../search/dto/search.dto';

@Controller('psu')
export class PsuController {
  constructor(private readonly psuService: PsuService) {}
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createPsuDto: CreatePsuDto) {
    return this.psuService.create(createPsuDto);
  }

  @Get()
  findAll(@Query() params: SearchDto) {
    return this.psuService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.psuService.findOne(id);
  }
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePsuDto: UpdatePsuDto,
  ) {
    return this.psuService.update(id, updatePsuDto);
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.psuService.remove(id);
  }
}

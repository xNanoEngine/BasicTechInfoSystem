import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Search') // Para que salga bonito en Swagger
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Buscador global de componentes con filtros' })
  search(@Query() searchDto: SearchDto) {
    return this.searchService.searchGlobal(searchDto);
  }
}

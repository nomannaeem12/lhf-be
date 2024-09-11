import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CarriersService } from './carriers.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';
import { Carrier } from './entities/carrier.entity';
import { NewRegisteredCarriers } from './entities/new-registered-carriers.entity';

@Controller('carriers')
export class CarriersController {
  constructor(private readonly carriersService: CarriersService) {}
  @Post()
  create(@Body() createCarrierDto: CreateCarrierDto) {
    return this.carriersService.create(createCarrierDto);
  }

  @Get()
  async getFilteredCarriers(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('searchText') searchText?: string,
    @Query('sortField') sortField?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ): Promise<{ carriers: Carrier[]; totalCount: number }> {
    return await this.carriersService.getFilteredCarriers(
      page,
      pageSize,
      searchText,
      sortField,
      sortOrder,
    );
  }

  @Get('new-registered-carriers')
  async getNewRegisteredCarriers(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('searchText') searchText?: string,
    @Query('sortField') sortField?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ): Promise<{ carriers: NewRegisteredCarriers[]; totalCount: number }> {
    return await this.carriersService.getNewRegisteredCarriers(
      page,
      pageSize,
      searchText,
      sortField,
      sortOrder,
    );
  }

  @Get()
  findAll() {
    return this.carriersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carriersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarrierDto: UpdateCarrierDto) {
    return this.carriersService.update(+id, updateCarrierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carriersService.remove(+id);
  }
}

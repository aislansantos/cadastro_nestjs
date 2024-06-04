import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sellers')
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  public async create(@Body() createSellerDto: CreateSellerDto) {
    return await this.sellersService.create(createSellerDto);
  }

  @Get()
  public async findAll() {
    return await this.sellersService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.sellersService.findOne(+id);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateSellerDto: UpdateSellerDto,
  ) {
    return await this.sellersService.update(+id, updateSellerDto);
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.sellersService.remove(+id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { Role } from 'src/utils/enums/role.enum';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellersService } from './sellers.service';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.User)
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

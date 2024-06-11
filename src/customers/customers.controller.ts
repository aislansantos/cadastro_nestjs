import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

// ! decorator do Swagger para criar as separações
@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  public async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.create(createCustomerDto);
  }

  @Get()
  public async findAll() {
    return await this.customersService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.customersService.findOne(+id);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.customersService.remove(+id);
  }
}

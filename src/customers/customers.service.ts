import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomersService {
  private updatedData = new Date();
  constructor(private readonly prisma: PrismaService) {}

  public async create(createCustomerDto: CreateCustomerDto) {
    return await this.prisma.customer.create({ data: createCustomerDto });
  }

  public async findAll() {
    return await this.prisma.customer.findMany();
  }

  async findOne(id: number) {
    await this.ifNotExists(id);
    return await this.prisma.customer.findUnique({ where: { id } });
  }

  public async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.ifNotExists(id);

    const data: any = {};

    for (const keys of Object.keys(updateCustomerDto)) {
      if (updateCustomerDto[keys]) data[keys] = updateCustomerDto[keys];
    }

    data.updatedAt = this.updatedData;

    return await this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.ifNotExists(id);

    return this.prisma.customer.delete({ where: { id } });
  }

  async ifNotExists(id: number) {
    if (!(await this.prisma.customer.count({ where: { id } }))) {
      throw new NotFoundException(`Cliente com o id: ${id} não existe.`);
    }
  }
}

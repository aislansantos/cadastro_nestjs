import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SellersService {
  private updateData = new Date();
  constructor(private readonly prisma: PrismaService) {}
  public async create(createSellerDto: CreateSellerDto) {
    return await this.prisma.seller.create({ data: createSellerDto });
  }

  public async findAll() {
    return await this.prisma.seller.findMany();
  }

  public async findOne(id: number) {
    await this.ifNotExtist(id);
    return await this.prisma.seller.findUnique({ where: { id } });
  }

  public async update(id: number, updateSellerDto: UpdateSellerDto) {
    await this.ifNotExtist(id);

    const data: any = {};

    for (const keys of Object.keys(updateSellerDto)) {
      if (updateSellerDto[keys]) data[keys] = updateSellerDto[keys];
    }

    data.updatedAt = this.updateData;

    return await this.prisma.seller.update({
      where: { id },
      data,
    });
  }

  public async remove(id: number) {
    await this.ifNotExtist(id);
    return await this.prisma.seller.delete({ where: { id } });
  }

  private async ifNotExtist(id: number) {
    if (!(await this.prisma.seller.count({ where: { id } }))) {
      throw new NotFoundException(`Vendedor com o id ${id} não encontrado.`);
    }
  }
}

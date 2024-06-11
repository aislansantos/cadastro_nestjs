import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private updatedData = new Date();
  constructor(private readonly prisma: PrismaService) {}

  public async create(createUserDto: CreateUserDto) {
    const newData: any = {};

    for (const keys of Object.keys(createUserDto)) {
      if (createUserDto[keys]) newData[keys] = createUserDto[keys];
    }
    if (newData.birthAt) {
      newData.birthAt = new Date(newData.birthAt);
    }

    return await this.prisma.user.create({
      data: newData,
    });
  }

  public async findAll() {
    return await this.prisma.user.findMany();
  }

  public async findOne(id: number) {
    await this.IfNotExist(id);
    return await this.prisma.user.findUnique({ where: { id } });
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    await this.IfNotExist(id);
    const newData: any = {};

    for (const keys of Object.keys(updateUserDto)) {
      if (updateUserDto[keys]) newData[keys] = updateUserDto[keys];
    }
    if (newData.birthAt) {
      newData.birthAt = new Date(newData.birthAt);
    }

    data.updatedAt = this.updatedData;

    return await this.prisma.user.update({
      where: { id },
      data: newData,
    });
  }

  public async remove(id: number) {
    await this.IfNotExist(id);
    return await this.prisma.user.delete({ where: { id } });
  }

  async IfNotExist(id: number) {
    if (!(await this.prisma.user.count({ where: { id } }))) {
      throw new NotFoundException(`Usuário com o id: ${id} não existe.`);
    }
  }
}

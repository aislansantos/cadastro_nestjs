import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  updatedData = new Date();
  constructor(private readonly prisma: PrismaService) {}

  public async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return this.prisma.user.create({ data: createUserDto });
  }

  public async findAll() {
    return await this.prisma.user.findMany();
  }

  public async findOne(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    await this.IfNotExist(id);

    const data: any = {};

    for (const keys of Object.keys(updateUserDto)) {
      console.log(updateUserDto[keys]);
      if (updateUserDto[keys]) {
        data[keys] = updateUserDto[keys];
      }
    }

    if (data.birthAt) {
      data.birthAt = new Date(data.birthAt);
    }

    data.updatedAt = this.updatedData;

    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  public async remove(id: number) {
    await this.IfNotExist(id);
    return await this.prisma.user.delete({ where: { id } });
  }

  async IfNotExist(id: number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException(`Usuário com o ${id} não existe.`);
    }
  }
}

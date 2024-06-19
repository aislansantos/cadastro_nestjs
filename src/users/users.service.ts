import { BadGatewayException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly usersRepository: Repository<UserEntity>,
	) {}

	public async create(data: CreateUserDto) {
		if (
			await this.usersRepository.exists({
				where: {
					email: data.email,
				},
			})
		)
			throw new BadGatewayException("Este e-mail já existe.");

		const salt = await bcrypt.genSalt();
		data.password = await bcrypt.hash(data.password, salt);
		const user = this.usersRepository.create(data);
		return this.usersRepository.save(user);
	}

	public async findAll() {
		return await this.usersRepository.find();
	}

	public async findOne(id: number) {
		await this.usersRepository.findOne({ where: { id } });
		return await this.usersRepository.findOneBy({
			id,
		});
	}

	public async update(id: number, updateUserDto: UpdateUserDto) {
		// const newData: any = {};
		// for (const keys of Object.keys(updateUserDto)) {
		//   if (updateUserDto[keys]) newData[keys] = updateUserDto[keys];
		// }
		// if (newData.birthAt) {
		//   newData.birthAt = new Date(newData.birthAt);
		// }
		// newData.updatedAt = this.updatedData;
		// return await this.prisma.user.update({
		//   where: { id },
		//   data: newData,
		// });
	}

	public async remove(id: number) {
		// return await this.prisma.user.delete({ where: { id } });
	}
}

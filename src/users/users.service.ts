import {
	BadGatewayException,
	Injectable,
	NotFoundException
} from "@nestjs/common";
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
		private readonly usersRepository: Repository<UserEntity>
	) {}

	public async create(data: CreateUserDto) {
		if (
			await this.usersRepository.exists({
				where: {
					email: data.email
				}
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
			id
		});
	}

	public async update(id: number, updateUserDto: UpdateUserDto) {
		if (updateUserDto.birthAt) {
			updateUserDto.birthAt = String(new Date(updateUserDto.birthAt));
		}
		if (updateUserDto.password) {
			const salt = await bcrypt.genSalt();
			updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
		}
		return await this.usersRepository.update(id, updateUserDto);
	}

	public async remove(id: number) {
		await this.exists(id);
		await this.usersRepository.delete(id);

		return true;
	}

	private async exists(id: number) {
		if (
			!(await this.usersRepository.exists({
				where: {}
			}))
		) {
			throw new NotFoundException(`O usuário com o ${id} não existe.`);
		}
	}
}

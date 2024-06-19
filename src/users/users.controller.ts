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
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { AuthGuard } from "src/guards/auth/auth.guard";
import { RoleGuard } from "src/guards/role/role.guard";
import { Role } from "src/utils/enums/role.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@ApiTags("Users")
@UseGuards(AuthGuard, RoleGuard)
@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Roles(Role.Admin)
	@Post()
	public async create(@Body() createUserDto: CreateUserDto) {
		return await this.usersService.create(createUserDto);
	}

	@Roles(Role.Admin, Role.User)
	@Get()
	public async findAll() {
		return await this.usersService.findAll();
	}

	@Get(":id")
	public async findOne(@Param("id", ParseIntPipe) id: number) {
		return await this.usersService.findOne(+id);
	}

	@Roles(Role.Admin)
	@Patch(":id")
	public async update(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return await this.usersService.update(+id, updateUserDto);
	}

	@Roles(Role.Admin)
	@Delete(":id")
	public async remove(@Param("id", ParseIntPipe) id: string) {
		return await this.usersService.remove(+id);
	}
}

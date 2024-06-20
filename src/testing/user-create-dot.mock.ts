import { CreateUserDto } from "../users/dto/create-user.dto";
import { Status } from "../utils/enums/active.enum";
import { Role } from "../utils/enums/role.enum";

export const createUserDTO: CreateUserDto = {
	name: "Aislan",
	email: "aislan.santos@gmail.com",
	password: "Aa123456",
	birthAt: new Date("1985-11-05"),
	role: Role.Admin,
	status: Status.active
};

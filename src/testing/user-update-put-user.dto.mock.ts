import { UpdateUserDto } from "../users/dto/update-user.dto";
import { Status } from "../utils/enums/active.enum";
import { Role } from "../utils/enums/role.enum";

export const updatePutUserDTO: UpdateUserDto = {
	name: "Aislan",
	email: "aislan.santos@gmail.com",
	password: "Aa123456",
	birthAt: new Date("1985-11-05"),
	role: Role.Admin,
	status: Status.active
};

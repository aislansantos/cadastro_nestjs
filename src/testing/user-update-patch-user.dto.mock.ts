import { UpdateUserDto } from "../users/dto/update-user.dto";
import { Role } from "../utils/enums/role.enum";

export const updatePatchUserDTO: UpdateUserDto = {
	role: Role.User,
};

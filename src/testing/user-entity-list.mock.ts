import { UserEntity } from "../users/entities/user.entity";
import { Status } from "../utils/enums/active.enum";
import { Role } from "../utils/enums/role.enum";

export const userEntityList: UserEntity[] = [
	{
		name: "Aislan Santos",
		email: "aislan.santos@gmail.com",
		birthAt: String(new Date("1985-11-05")),
		id: 1,
		password: "$2b$10$q8j4GT14ksUDtG7gx0UQSuyfULF38XFMTwFgCLsg46d4zBjNcjMKG",
		role: Role.Admin,
		createdAt: String(new Date()),
		updatedAt: String(new Date()),
		status: Status.active,
	},
	{
		name: "Augusto Santos",
		email: "augusto.santos@gmail.com",
		birthAt: String(new Date("1999-01-01")),
		id: 1,
		password: "$2b$10$q8j4GT14ksUDtG7gx0UQSuyfULF38XFMTwFgCLsg46d4zBjNcjMKG",
		role: Role.Admin,
		createdAt: String(new Date()),
		updatedAt: String(new Date()),
		status: Status.active,
	},
];

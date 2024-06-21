import { UsersService } from "../users/users.service";
import { userEntityList } from "./user-entity-list.mock";

export const userServiceMock = {
	provide: UsersService,
	useValue: {
		show: jest.fn().mockResolvedValue(userEntityList[0]),
		create: jest.fn().mockResolvedValue(userEntityList[0]),
		findAll: jest.fn().mockResolvedValue(userEntityList),
		findOne: jest.fn().mockResolvedValue(userEntityList[0]),
		update: jest.fn().mockResolvedValue(userEntityList[0]),
		remove: jest.fn().mockResolvedValue(true),
		exists: jest.fn().mockResolvedValue(true)
	}
};

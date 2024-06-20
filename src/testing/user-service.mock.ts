import { UsersService } from "../users/users.service";
import { userEntityList } from "./user-entity-list.mock";

export const userServiceMock = {
	provide: UsersService,
	useValue: {
		show: jest.fn().mockResolvedValue(userEntityList[0]),
		create: jest.fn().mockResolvedValue(userEntityList[0]),
		list: jest.fn().mockResolvedValue(userEntityList),
		putUpdate: jest.fn().mockResolvedValue(userEntityList[0]),
		patchUpdate: jest.fn().mockResolvedValue(userEntityList[0]),
		delete: jest.fn().mockResolvedValue(true),
		exists: jest.fn().mockResolvedValue(true)
	}
};

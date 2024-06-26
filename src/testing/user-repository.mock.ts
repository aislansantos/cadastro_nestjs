import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../users/entities/user.entity";
import { userEntityList } from "./user-entity-list.mock";

export const userRepositoryMock = {
	provide: getRepositoryToken(UserEntity),
	useValue: {
		exists: jest.fn().mockResolvedValue(true),
		create: jest.fn(),
		save: jest.fn().mockResolvedValue(userEntityList[0]),
		find: jest.fn().mockResolvedValue(userEntityList),
		findAll: jest.fn().mockResolvedValue(userEntityList),
		findOne: jest.fn().mockResolvedValue(userEntityList[0]),
		findOneBy: jest.fn().mockResolvedValue(userEntityList[0]),
		update: jest.fn().mockResolvedValue(userEntityList[0]),
		delete: jest.fn()
	}
};

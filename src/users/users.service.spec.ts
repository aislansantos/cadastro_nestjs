import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createUserDTO } from "../utils/testing/user-create-dot.mock";
import { userEntityList } from "../utils/testing/user-entity-list.mock";
import { userRepositoryMock } from "../utils/testing/user-repository.mock";
import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./users.service";

describe("UsersService", () => {
	let userService: UsersService;
	let userRepository: Repository<UserEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, userRepositoryMock],
		}).compile();

		userService = module.get<UsersService>(UsersService);
		userRepository = module.get(getRepositoryToken(UserEntity));
	});

	it("should be defined UserService", () => {
		expect(userService).toBeDefined();
		expect(userRepository).toBeDefined();
	});

	it("should be tested method create", async () => {
		jest.spyOn(userRepository, "exists").mockResolvedValueOnce(false);

		const result = await userService.create(createUserDTO);

		expect(result).toBe(userEntityList[0]);
	});
});

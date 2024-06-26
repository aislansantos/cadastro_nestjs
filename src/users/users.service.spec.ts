import { BadGatewayException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createUserDTO } from "../testing/user-create-dot.mock";
import { userEntityList } from "../testing/user-entity-list.mock";
import { userRepositoryMock } from "../testing/user-repository.mock";
import { updatePatchUserDTO } from "../testing/user-update-patch-user.dto.mock";
import { updatePutUserDTO } from "../testing/user-update-put-user.dto.mock";
import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./users.service";

describe("UsersService", () => {
	let userService: UsersService;
	let userRepository: Repository<UserEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, userRepositoryMock]
		}).compile();

		userService = module.get<UsersService>(UsersService);
		userRepository = module.get(getRepositoryToken(UserEntity));
	});

	describe("Defined", () => {
		it("should be defined UserService and userRepository", () => {
			expect(userService).toBeDefined();
			expect(userRepository).toBeDefined();
		});
	});

	describe("Create", () => {
		it("should be tested method create", async () => {
			jest.spyOn(userRepository, "exists").mockResolvedValueOnce(false);

			const result = await userService.create(createUserDTO);

			expect(result).toBe(userEntityList[0]);
		});
		it("should be return user exists", async () => {
			try {
				await userService.create(userEntityList[0]);
				fail("Expected BadGatewayException to be thrown");
			} catch (error) {
				expect(error).toBeInstanceOf(BadGatewayException);
				expect(error.message).toBe("Este e-mail já existe.");
			}
		});
	});

	describe("Read", () => {
		it("should found all users", async () => {
			const result = await userService.findAll();

			expect(result).toBe(userEntityList);
		});
		it("should found one user", async () => {
			const result = await userService.findOne(1);

			expect(result).toBe(userEntityList[0]);
		});
	});

	describe("Update", () => {
		it("should be updated all user data", async () => {
			const result = await userService.update(1, updatePutUserDTO);

			expect(result).toEqual(userEntityList[0]);
		});

		it("should be updated one data user", async () => {
			const result = await userService.update(1, updatePatchUserDTO);

			expect(result).toEqual(userEntityList[0]);
		});
	});

	describe("Delete", () => {
		it("should be deleted one register", async () => {
			const result = await userService.remove(1);

			expect(result).toBe(true);
		});
	});

	describe("Exists", () => {
		it("User not exists", async () => {
			jest.spyOn(userRepository, "exists").mockResolvedValueOnce(false);

			try {
				await userService.exists(userEntityList[0].id);
				fail("Expected NotFoundException to be thrown");
			} catch (error) {
				expect(error).toBeInstanceOf(NotFoundException);
				expect(error.message).toBe(
					`O usuário com o ${userEntityList[0].id} não existe.`
				);
			}
		});
	});
});

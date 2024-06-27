import { Test, TestingModule } from "@nestjs/testing";
import { AuthGuard } from "../guards/auth/auth.guard";
import { RoleGuard } from "../guards/role/role.guard";
import { AuthGuardMock } from "../testing/guard-auth.mock";
import { RoleGuardMock } from "../testing/guard-role.mock";
import { createUserDTO } from "../testing/user-create-dot.mock";
import { userEntityList } from "../testing/user-entity-list.mock";
import { userServiceMock } from "../testing/user-service.mock";
import { UsersController } from "./users.controller";

describe("UsersController", () => {
	let userController: UsersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [userServiceMock]
		})
			.overrideGuard(AuthGuard)
			.useValue(AuthGuardMock)
			.overrideGuard(RoleGuard)
			.useValue(RoleGuardMock)
			.compile();

		userController = module.get<UsersController>(UsersController);
	});

	it("should be defined userController e userService", () => {
		expect(userController).toBeDefined();
		expect(userServiceMock).toBeDefined();
	});

	describe("Validated Create", () => {
		it("Should be created method controler", async () => {
			const result = await userController.create(createUserDTO);

			expect(result).toBe(userEntityList[0]);
			expect(userServiceMock.useValue.create).toHaveBeenCalledTimes(1);
			expect(userServiceMock.useValue.create).toHaveBeenCalledWith(
				createUserDTO
			);
		});
	});

	describe("validated finds methods", () => {
		it("should return a user list entity successfully", async () => {
			// Act
			const result = await userController.findAll();

			// Assert
			expect(result).toEqual(userEntityList);
			expect(typeof result).toBe("object");
			expect(userServiceMock.useValue.findAll).toHaveBeenCalledTimes(1);
		});
		it("shoul throw an exception", () => {
			// Arrange
			jest
				.spyOn(userServiceMock.useValue, "findAll")
				.mockRejectedValueOnce(new Error());

			// Assert
			expect(userController.findAll()).rejects.toThrow(Error);
		});
		it("Should found one user", async () => {
			const result = await userController.findOne(1);

			expect(result).toEqual(userEntityList[0]);
		});
	});

	describe("Validated Update", () => {
		it("Should be update method controler", async () => {
			const result = await userController.update(1, createUserDTO);

			expect(result).toBe(userEntityList[0]);
		});
	});

	describe("Validated Delete", () => {
		it("Should be delete method controler", async () => {
			const result = await userController.remove("1");

			expect(result).toBe(true);
		});
	});
});

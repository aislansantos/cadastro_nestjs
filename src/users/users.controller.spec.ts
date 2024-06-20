import { Test, TestingModule } from "@nestjs/testing";
import { userServiceMock } from "../testing/user-service.mock";
import { UsersController } from "./users.controller";

describe("UsersController", () => {
	let controller: UsersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [userServiceMock]
		}).compile();

		controller = module.get<UsersController>(UsersController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});

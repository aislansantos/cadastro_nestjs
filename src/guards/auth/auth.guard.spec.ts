import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../../auth/auth.service";
import { authServiceMock } from "../../testing/auth-service.mock";
import { jwtServiceMock } from "../../testing/jwt-service.mock";
import { mailerServiceMock } from "../../testing/mailer-service.mock";
import { userRepositoryMock } from "../../testing/user-repository.mock";
import { userServiceMock } from "../../testing/user-service.mock";
import { UsersService } from "../../users/users.service";
import { AuthGuard } from "./auth.guard";

describe("AuthController", () => {
	let authGuard: AuthGuard;
	let authService: AuthService;
	let userService: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthGuard],
			providers: [
				authServiceMock,
				userServiceMock,
				jwtServiceMock,
				mailerServiceMock,
				userRepositoryMock
			]
		}).compile();

		authService = module.get<AuthService>(AuthService);
		userService = module.get<UsersService>(UsersService);
	});
	describe("AuthGuard", () => {
		it("should be defined", () => {
			expect(new AuthGuard(authService, userService)).toBeDefined();
		});
	});
});

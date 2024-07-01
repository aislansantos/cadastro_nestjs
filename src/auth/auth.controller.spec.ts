import { Test, TestingModule } from "@nestjs/testing";
import { AuthGuard } from "../guards/auth/auth.guard";
import { accessToken } from "../testing/access-token.mock";
import { authForgetDto } from "../testing/auth-forget-dto.mock";
import { authLoginDto } from "../testing/auth-login-dot.mock";
import { authRegisterDto } from "../testing/auth-register-dto.mock";
import { authResetDto } from "../testing/auth-reset-dto.mock";
import { authServiceMock } from "../testing/auth-service.mock";
import { AuthGuardMock } from "../testing/guard-auth.mock";
import { userEntityList } from "../testing/user-entity-list.mock";
import { AuthController } from "./auth.controller";

describe("AuthController", () => {
	let authController: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [authServiceMock]
		})
			.overrideGuard(AuthGuard)
			.useValue(AuthGuardMock)
			.compile();

		authController = module.get<AuthController>(AuthController);
	});

	it("should be defined", () => {
		expect(authController).toBeDefined();
	});

	describe("Authentication Flow", () => {
		it("login method", async () => {
			const result = await authController.login(authLoginDto);

			expect(result.accessToken).toBe(accessToken);
		});

		it("register method", async () => {
			const result = await authController.register(authRegisterDto);
			expect(result.accessToken).toBe(accessToken);
		});

		it("forget method", async () => {
			const result = await authController.forget(authForgetDto);
			expect(result).toEqual({ success: true });
		});

		it("reset methog", async () => {
			const result = await authController.reset(authResetDto);

			expect(result.accessToken).toBe(accessToken);
		});
	});

	describe("authenticated routes", () => {
		it("me method", async () => {
			const result = await authController.me(userEntityList[0]);
			expect(result).toBe(userEntityList[0]);
		});
	});
});

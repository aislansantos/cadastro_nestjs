import { Test, TestingModule } from "@nestjs/testing";
import { accessToken } from "../testing/access-token.mock";
import { authResgisterDto } from "../testing/auth-register-dot.mock";
import { jwtPayload } from "../testing/jwt-payload.mock";
import { jwtServiceMock } from "../testing/jwt-service.mock";
import { mailerServiceMock } from "../testing/mailer-service.mock";
import { resetToken } from "../testing/reset-token.mock";
import { userEntityList } from "../testing/user-entity-list.mock";
import { userRepositoryMock } from "../testing/user-repository.mock";
import { userServiceMock } from "../testing/user-service.mock";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
	let authService: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				userRepositoryMock,
				jwtServiceMock,
				userServiceMock,
				mailerServiceMock
			]
		}).compile();

		authService = module.get<AuthService>(AuthService);
	});

	it("should be defined", () => {
		expect(authService).toBeDefined();
	});

	describe("Token", () => {
		it("should be Create Token Method", () => {
			const result = authService.createToken(userEntityList[0]);

			expect(result).toEqual({ accessToken });
		});

		it("should be Check Token Method", () => {
			const result = authService.checkToken(accessToken);

			expect(result).toBe(jwtPayload);
		});

		it("should be isValidToken Method", () => {
			const result = authService.isValidToken(accessToken);

			expect(result).toBe(true);
		});
	});

	describe("Authentication", () => {
		it("should be Login Method", async () => {
			const result = await authService.login("juca@gmail.com", "Aa123456");

			expect(result).toEqual({ accessToken });
		});

		it("should be Forget Method", async () => {
			const result = await authService.forget(accessToken);

			expect(result).toEqual({ success: true });
		});

		it("should be Reset Password Method", async () => {
			const result = await authService.reset("Bb654321", resetToken);

			expect(result.accessToken).toEqual(accessToken);
		});

		it("should be Resgister Method", async () => {
			const result = await authService.register(authResgisterDto);

			expect(result.accessToken).toEqual(accessToken);
		});
	});
});

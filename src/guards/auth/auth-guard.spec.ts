import { UnauthorizedException } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common/interfaces";
import { Test, TestingModule } from "@nestjs/testing";
import { authServiceMock } from "../../testing/auth-service.mock";
import { AuthGuardMock } from "../../testing/guard-auth.mock";
import { jwtPayload } from "../../testing/jwt-payload.mock";
import { userEntityList } from "../../testing/user-entity-list.mock";
import { userServiceMock } from "../../testing/user-service.mock";

describe("AuthGuard", () => {
	let authGuard: AuthGuardMock;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthGuardMock, authServiceMock, userServiceMock]
		}).compile();

		authGuard = module.get<AuthGuardMock>(AuthGuardMock);
	});

	it("should be defined", () => {
		expect(authGuard).toBeDefined();
	});

	it("should allow access with valid token", async () => {
		const mockRequest: any = {
			headers: {
				authorization: `Bearer validAccessToken`
			}
		};

		const mockContext: ExecutionContext = {
			switchToHttp: () => ({
				getRequest: () => mockRequest
			})
		} as ExecutionContext;

		const result = await authGuard.canActivate(mockContext);

		expect(result).toBe(true);
		expect(mockRequest.tokenPayload).toEqual(jwtPayload);
		expect(mockRequest.user).toEqual(userEntityList[0]);
	});

	it("should throw UnauthorizedException with invalid token", async () => {
		const mockRequest: any = {
			headers: {
				authorization: `Bearer invalidAccessToken`
			}
		};

		const mockContext: ExecutionContext = {
			switchToHttp: () => ({
				getRequest: () => mockRequest
			})
		} as ExecutionContext;

		try {
			await authGuard.canActivate(mockContext);
		} catch (error) {
			expect(error instanceof UnauthorizedException).toBe(true);
			expect(error.message).toBe("Unauthorized");
		}
	});

	it("should throw UnauthorizedException when authorization header is missing", async () => {
		const mockRequest: any = {
			headers: {} // Empty headers
		};

		const mockContext: ExecutionContext = {
			switchToHttp: () => ({
				getRequest: () => mockRequest
			})
		} as ExecutionContext;

		try {
			await authGuard.canActivate(mockContext);
		} catch (error) {
			expect(error instanceof UnauthorizedException).toBe(true);
			expect(error.message).toBe("Unauthorized");
		}
	});

	it("should throw UnauthorizedException with expired token", async () => {
		const mockRequest: any = {
			headers: {
				authorization: `Bearer expiredAccessToken`
			}
		};

		const mockContext: ExecutionContext = {
			switchToHttp: () => ({
				getRequest: () => mockRequest
			})
		} as ExecutionContext;

		try {
			await authGuard.canActivate(mockContext);
		} catch (error) {
			expect(error instanceof UnauthorizedException).toBe(true);
			expect(error.message).toBe("Unauthorized");
		}
	});

	it("should throw UnauthorizedException when token payload cannot be validated", async () => {
		const mockRequest: any = {
			headers: {
				authorization: `Bearer invalidPayloadToken`
			}
		};

		const mockContext: ExecutionContext = {
			switchToHttp: () => ({
				getRequest: () => mockRequest
			})
		} as ExecutionContext;

		try {
			await authGuard.canActivate(mockContext);
		} catch (error) {
			expect(error instanceof UnauthorizedException).toBe(true);
			expect(error.message).toBe("Unauthorized");
		}
	});

	it("should throw UnauthorizedException when AuthService throws an exception", async () => {
		const mockRequest: any = {
			headers: {
				authorization: `Bearer validAccessToken`
			}
		};

		const mockContext: ExecutionContext = {
			switchToHttp: () => ({
				getRequest: () => mockRequest
			})
		} as ExecutionContext;

		// Mockando o AuthService para lançar UnauthorizedException
		jest
			.spyOn(authServiceMock.useValue, "checkToken")
			.mockImplementation(() => {
				throw new UnauthorizedException("Invalid token");
			});

		try {
			await authGuard.canActivate(mockContext);
		} catch (error) {
			expect(error instanceof UnauthorizedException).toBe(true);
			expect(error.message).toBe("Invalid token");
			// Verifica se o fluxo de execução correta foi mantido
			expect(mockRequest.tokenPayload).toBeUndefined();
			expect(mockRequest.user).toBeUndefined();
		}
	});
});

import { UnauthorizedException } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common/interfaces";
import { Test, TestingModule } from "@nestjs/testing";
import { accessToken } from "../../testing/access-token.mock";
import { authServiceMock } from "../../testing/auth-service.mock";
import { jwtPayload } from "../../testing/jwt-payload.mock";
import { userEntityList } from "../../testing/user-entity-list.mock";
import { userServiceMock } from "../../testing/user-service.mock";
import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
	let authGuard: AuthGuard;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthGuard, authServiceMock, userServiceMock]
		}).compile();

		authGuard = module.get<AuthGuard>(AuthGuard);
	});

	it("should be defined", () => {
		expect(authGuard).toBeDefined();
	});

	it("should allow access with valid token", async () => {
		const mockRequest: any = {
			headers: {
				authorization: `Bearer ${accessToken}`
			}
		};

		const mockContext: ExecutionContext = {
			switchToHttp: () => ({
				getRequest: () => mockRequest
			})
		} as ExecutionContext;

		// Configurando o mock para retornar dados válidos ao verificar o token
		jest
			.spyOn(authServiceMock.useValue, "checkToken")
			.mockReturnValue(jwtPayload);

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

		// Configurando o mock para lançar uma exceção ao verificar o token
		jest
			.spyOn(authServiceMock.useValue, "checkToken")
			.mockImplementation(() => {
				throw new UnauthorizedException("Invalid token");
			});

		try {
			await authGuard.canActivate(mockContext);
			throw new Error("Expected canActivate to throw UnauthorizedException");
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
			throw new Error("Expected canActivate to throw UnauthorizedException");
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
			throw new Error("Expected canActivate to throw UnauthorizedException");
		} catch (error) {
			expect(error instanceof UnauthorizedException).toBe(true);
			expect(error.message).toBe("Unauthorized"); // Manter a mensagem esperada como "Unauthorized"
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

		// Configurar o mock para lançar uma exceção ao verificar o token
		jest
			.spyOn(authServiceMock.useValue, "checkToken")
			.mockImplementation(() => {
				throw new UnauthorizedException("Invalid token payload");
			});

		try {
			await authGuard.canActivate(mockContext);
			throw new Error("Expected canActivate to throw UnauthorizedException");
		} catch (error) {
			expect(error instanceof UnauthorizedException).toBe(true);
			expect(error.message).toBe("Unauthorized");
		}
	});
});

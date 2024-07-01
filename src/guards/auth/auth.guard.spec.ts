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

		// Mock para retornar dados válidos ao verificar o token
		jest
			.spyOn(authServiceMock.useValue, "checkToken")
			.mockReturnValue(jwtPayload);
		jest
			.spyOn(userServiceMock.useValue, "findOne")
			.mockResolvedValue(userEntityList[0]);

		const result = await authGuard.canActivate(mockContext);

		expect(result).toBe(true);
		expect(mockRequest.tokenPayload).toEqual(jwtPayload);
		expect(mockRequest.user).toEqual(userEntityList[0]);
	});

	it("should handle errors thrown by userService", async () => {
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

		jest
			.spyOn(authServiceMock.useValue, "checkToken")
			.mockReturnValue(jwtPayload);
		jest
			.spyOn(userServiceMock.useValue, "findOne")
			.mockRejectedValue(new Error("User not found"));

		const result = await authGuard.canActivate(mockContext);

		expect(result).toBe(false);
		expect(mockRequest.tokenPayload).toEqual(jwtPayload);
		expect(mockRequest.user).toBeUndefined();
	});
});

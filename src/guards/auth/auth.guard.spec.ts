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

	it("should not allow access with invalid token", async () => {
		const mockRequest: any = {
			headers: {
				authorization: `token invalid`
			}
		};

		const mockContext: ExecutionContext = {
			switchToHttp: () => ({
				getRequest: () => mockRequest
			})
		} as ExecutionContext;

		// Configurando o mock para retornar null ao verificar o token
		jest.spyOn(authServiceMock.useValue, "checkToken").mockReturnValue(null);

		const result = await authGuard.canActivate(mockContext);

		expect(result).toBe(false); // Verificando que o acesso não é permitido
		expect(mockRequest.tokenPayload).toBeNull(); // Deve ser null, já que é assim que o mock está configurado
		expect(mockRequest.user).toBeUndefined(); // Não deve haver usuário associado
	});
});

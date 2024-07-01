import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcrypt";
import { accessToken } from "../testing/access-token.mock";
import { authRegisterDto } from "../testing/auth-register-dto.mock";
import { jwtPayload } from "../testing/jwt-payload.mock";
import { jwtServiceMock } from "../testing/jwt-service.mock";
import { mailerServiceMock } from "../testing/mailer-service.mock";
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

		// Mock bcrypt.hash com uma função jest.fn() que retorna uma Promise resolvida com newPassword
		(jest.spyOn(bcrypt, "hash") as jest.Mock).mockImplementation(
			(input: string) => Promise.resolve(input)
		);
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
			// Mock userService.findOne para retornar um usuário
			(userServiceMock.useValue.findOne as jest.Mock).mockResolvedValue(
				userEntityList[0]
			);

			const result = await authService.forget("juca@gmail.com");

			expect(result).toEqual({ success: true });

			// Verifique se o método sendMail de mailerService foi chamado com os parâmetros esperados
			expect(mailerServiceMock.useValue.sendMail).toHaveBeenCalledWith(
				expect.objectContaining({
					subject: "Recuperação de senha.",
					to: "juca@gmail.com",
					template: "forget",
					context: {
						name: userEntityList[0].name,
						token: expect.any(String) // Ajuste conforme necessário
					}
				})
			);
		});

		it("should be Register Method", async () => {
			const result = await authService.register(authRegisterDto);

			expect(result.accessToken).toEqual(accessToken);
		});
	});

	describe("Exceptions", () => {
		it("should throw an invalid token error", () => {
			const invalidToken = "invalidToken";
			(jwtServiceMock.useValue.verify as jest.Mock).mockImplementationOnce(
				() => {
					throw new Error("Token inválido");
				}
			);

			try {
				authService.checkToken(invalidToken);
				fail("Expected BadRequestException to be thrown");
			} catch (error) {
				expect(error).toBeInstanceOf(BadRequestException);
				expect(error.message).toBe("Token inválido");
			}
		});

		it("should throw UnauthorizedException for invalid email", async () => {
			const invalidEmail = "invalid@example.com";
			(userServiceMock.useValue.findOne as jest.Mock).mockResolvedValue(null);

			try {
				await authService.login(invalidEmail, "invalidPassword");
				fail("Expected UnauthorizedException to be thrown");
			} catch (error) {
				expect(error).toBeInstanceOf(UnauthorizedException);
				expect(error.message).toBe("E-mail e/ou senha incorretos");
			}
		});
	});

	describe("Reset Password", () => {
		it("should throw UnauthorizedException for invalid token", async () => {
			const invalidToken = "invalidToken";
			const newPassword = "newPassword123";

			// Mock jwtService.verify para lançar um erro
			(jwtServiceMock.useValue.verify as jest.Mock).mockImplementationOnce(
				() => {
					throw new Error("Token inválido");
				}
			);

			try {
				await authService.reset(newPassword, invalidToken);
				fail("Expected UnauthorizedException to be thrown");
			} catch (error) {
				expect(error).toBeInstanceOf(UnauthorizedException);
				expect(error.message).toBe("Token inválido");
			}
		});
	});

	describe("isValidToken", () => {
		it("should return true for a valid token", () => {
			const result = authService.isValidToken(accessToken);
			expect(result).toBe(true);
		});

		it("should return false for an invalid token", () => {
			// Mockando jwtServiceMock.verify para lançar uma BadRequestException
			(jwtServiceMock.useValue.verify as jest.Mock).mockImplementation(() => {
				throw new BadRequestException("Token inválido");
			});

			const result = authService.isValidToken("invalidToken");

			expect(result).toBe(false);
		});
	});

	describe("compareAssignaturesToken", () => {
		it("should verify token with correct parameters", () => {
			const token = "validToken";
			const expectedData = {
				id: 1,
				name: "John Doe"
			};

			// Mock implementation for jwtService.verify
			(jwtServiceMock.useValue.verify as jest.Mock).mockReturnValue(
				expectedData
			);

			const data = authService.compareAssignaturesToken(token);

			expect(data).toEqual(expectedData);

			// Ensure jwtService.verify was called with the correct parameters
			expect(jwtServiceMock.useValue.verify).toHaveBeenCalledWith(token, {
				issuer: "forget",
				audience: "users"
			});
		});
	});
});

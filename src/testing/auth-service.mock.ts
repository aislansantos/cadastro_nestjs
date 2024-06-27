import { UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { jwtPayload } from "../testing/jwt-payload.mock";
import { accessToken } from "./access-token.mock";

export const authServiceMock = {
	provide: AuthService,
	useValue: {
		createToken: jest.fn().mockReturnValue({ accessToken }),
		checkToken: jest.fn((token: string) => {
			if (token === "validAccessToken") {
				return jwtPayload;
			} else {
				throw new UnauthorizedException("Invalid token"); // Lançar com a mensagem correta
			}
		}),
		isValidToken: jest.fn((token: string) => token === "validAccessToken"), // Mockar isValidToken para verificar se o token é válido
		login: jest.fn().mockResolvedValue({ accessToken }),
		forget: jest.fn().mockResolvedValue({ success: true }),
		reset: jest.fn().mockReturnValue({ accessToken }),
		register: jest.fn().mockReturnValue({ accessToken })
	}
};

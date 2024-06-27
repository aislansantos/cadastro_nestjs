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
				throw new UnauthorizedException("Invalid token");
			}
		}),
		isValidToken: jest.fn((token: string) => token === accessToken),
		login: jest.fn().mockResolvedValue({ accessToken }),
		forget: jest.fn().mockResolvedValue({ success: true }),
		reset: jest.fn().mockResolvedValue({ accessToken }),
		register: jest.fn().mockResolvedValue({ accessToken })
	}
};

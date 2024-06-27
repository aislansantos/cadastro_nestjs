import { AuthResetDto } from "../auth/dto/auth-reset.dto";
import { resetToken } from "./reset-token.mock";

export const authResetDto: AuthResetDto = {
	password: "Bb123456",
	token: resetToken
};

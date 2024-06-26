import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../guards/auth/auth.guard";
import { UserEntity } from "../users/entities/user.entity";
import { User } from "../utils/decorators/user.decorator";
import { AuthService } from "./auth.service";
import { AuthForgetDto } from "./dto/auth-forget.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthResetDto } from "./dto/auth-reset.dto";

@ApiTags("Auths")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	public async login(@Body() { email, password }: AuthLoginDto) {
		return this.authService.login(email, password);
	}

	@Post("register")
	public async register(@Body() body: AuthRegisterDto) {
		return this.authService.register(body);
	}

	@Post("forget")
	public async forget(@Body() { email }: AuthForgetDto) {
		return this.authService.forget(email);
	}

	@Post("reset")
	public async reset(@Body() { password, token }: AuthResetDto) {
		return this.authService.reset(password, token);
	}

	@UseGuards(AuthGuard)
	@Post("me")
	public async me(@User() user: UserEntity) {
		return user;
	}
}

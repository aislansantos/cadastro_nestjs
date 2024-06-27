import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from "@nestjs/common";
import { AuthService } from "../../auth/auth.service";
import { UsersService } from "../../users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UsersService
	) {}

	public async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const { authorization } = request.headers;

		try {
			if (!authorization || !authorization.startsWith("Bearer ")) {
				throw new UnauthorizedException("Unauthorized");
			}

			const token = authorization.split(" ")[1];
			const data = this.authService.checkToken(token);

			request.tokenPayload = data;
			request.user = await this.userService.findOne(data.id);

			return true;
		} catch (e) {
			throw new UnauthorizedException("Unauthorized");
		}
	}
}

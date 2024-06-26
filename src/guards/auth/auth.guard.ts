import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
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

		console.log(authorization);

		try {
			//  Neste ponto se não estourarmo uma excessão temos os dados do payload
			const data = this.authService.checkToken(
				(authorization ?? "").split(" ")[1]
			);

			request.tokenPayload = data;
			console.log(data);

			request.user = await this.userService.findOne(data.id);

			return true;
		} catch (e) {
			return false;
		}
	}
}

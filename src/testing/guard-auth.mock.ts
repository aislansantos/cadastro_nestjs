import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from "@nestjs/common";
import { jwtPayload } from "../testing/jwt-payload.mock"; // Verifique o caminho correto
import { userEntityList } from "./user-entity-list.mock";

@Injectable()
export class AuthGuardMock implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const { authorization } = request.headers;

		// Verifica se o cabeçalho de autorização existe e começa com "Bearer "
		if (!authorization || !authorization.startsWith("Bearer ")) {
			throw new UnauthorizedException();
		}

		const token = authorization.split(" ")[1];

		// Simula a verificação de validade do token
		if (token === "validAccessToken") {
			request.tokenPayload = jwtPayload; // Define o payload do token na requisição
			request.user = userEntityList[0]; // Define o usuário associado ao token na requisição
			return true;
		} else {
			throw new UnauthorizedException(); // Lança UnauthorizedException para tokens inválidos
		}
	}
}

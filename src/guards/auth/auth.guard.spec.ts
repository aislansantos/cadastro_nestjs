import { createMock } from "@golevelup/ts-jest";
import { ExecutionContext } from "@nestjs/common";
import { AuthService } from "../../auth/auth.service";
import { UsersService } from "../../users/users.service";
import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
	let authGuard: AuthGuard;
	let authService: AuthService;
	let userService: UsersService;

	beforeEach(async () => {
		authGuard = new AuthGuard(authService, userService);
	});
	describe("AuthGuard", () => {
		it("should be defined", () => {
			expect(authGuard).toBeDefined();
		});

		it("Auth canActivate", async () => {
			const context = createMock<ExecutionContext>();
			context.switchToHttp().getRequest.mockReturnValue({
				headers: {
					authorization: true
				}
			});

			expect(authGuard.canActivate(context)).toBeTruthy();
		});
	});
});

import { createMock } from "@golevelup/ts-jest";
import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RoleGuard } from "./role.guard";

describe("RoleGuard", () => {
	let roleGuard: RoleGuard;
	let reflector: Reflector;

	beforeEach(async () => {
		reflector = new Reflector();
		roleGuard = new RoleGuard(reflector);
	});
	describe("roleGuard", () => {
		it("should be defined", () => {
			expect(roleGuard).toBeDefined();
		});

		it("Role canActivate", async () => {
			const role = createMock<ExecutionContext>();
			role.switchToHttp().getRequest.mockReturnValue({
				user: true
			});
			expect(roleGuard.canActivate(role)).toBeTruthy();
		});
	});
});

import { CanActivate } from "@nestjs/common";

export const AuthGuardMock: CanActivate = {
	canActivate: jest.fn(() => true)
};

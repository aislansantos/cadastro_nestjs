import { Test, TestingModule } from "@nestjs/testing";
import { jwtServiceMock } from "../testing/jwt-service.mock";
import { mailerServiceMock } from "../testing/mailer-service.mock";
import { userRepositoryMock } from "../testing/user-repository.mock";
import { userServiceMock } from "../testing/user-service.mock";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				userRepositoryMock,
				jwtServiceMock,
				userServiceMock,
				mailerServiceMock
			]
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});

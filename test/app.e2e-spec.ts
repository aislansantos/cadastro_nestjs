import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { authRegisterDto } from "../src/testing/auth-register-dto.mock";
import { Role } from "../src/utils/enums/role.enum";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
	let app: INestApplication;
	let accessToken: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	// Termina aplicação despois do teste executado.
	afterEach(() => {
		app.close();
	});

	it("/ (GET)", () => {
		return request(app.getHttpServer())
			.get("/")
			.expect(200)
			.expect("Hello World!");
	});

	it("register a new User", async () => {
		const response = await request(app.getHttpServer())
			.post("/auth/register")
			.send(authRegisterDto);

		expect(response.statusCode).toBe(201);
		expect(typeof response.body.accessToken).toEqual("string");
	});

	it("try to login with new user", async () => {
		const response = await request(app.getHttpServer())
			.post("/auth/login")
			.send({
				email: authRegisterDto.email,
				password: authRegisterDto.password
			});

		expect(response.statusCode).toBe(201);
		expect(typeof response.body.accessToken).toEqual("string");

		accessToken = response.body.accessToken;
	});

	it("get logged in user data", async () => {
		const response = await request(app.getHttpServer())
			.post("/auth/me")
			.set("Authorization", `bearer ${accessToken}`)
			.send();

		console.log(response.header);

		expect(response.statusCode).toBe(201);
		expect(typeof response.body.id).toEqual("number");
		expect(response.body.role).toEqual(Role.User);
	});
});

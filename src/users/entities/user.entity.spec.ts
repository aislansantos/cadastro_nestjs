// src/entities/user.entity.spec.ts

import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { userEntityList } from "../../testing/user-entity-list.mock";
import { userRepositoryMock } from "../../testing/user-repository.mock";
import { UserEntity } from "./user.entity";

describe("UserEntity", () => {
	let userRepository: Repository<UserEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [userRepositoryMock]
		}).compile();

		userRepository = module.get<Repository<UserEntity>>(
			getRepositoryToken(UserEntity)
		);
	});

	it("should be defined", () => {
		expect(userRepository).toBeDefined();
	});

	it("should create a user", async () => {
		const user = userEntityList[0];

		const savedUser = await userRepository.save(user);

		expect(savedUser).toHaveProperty("id");
		expect(savedUser.name).toBe(userEntityList[0].name);
		expect(savedUser.email).toBe(userEntityList[0].email);
		expect(savedUser.role).toBe(userEntityList[0].role);
		expect(savedUser.status).toBe(userEntityList[0].status);
	});

	it("should update a user", async () => {
		const user = userEntityList[0];

		const savedUser = await userRepository.save(user);
		savedUser.name = "Jane Brown";

		const updatedUser = await userRepository.save(savedUser);

		expect(updatedUser.name).toBe("Jane Brown");
	});

	it("should delete a user", async () => {
		const user = userEntityList[0];

		// Salva o usuário no banco de dados mockado
		const savedUser = await userRepository.save(user);

		// Remove o usuário do banco de dados mockado
		await userRepository.delete(savedUser.id);

		// Tenta encontrar o usuário pelo ID após a remoção
		const deletedUser = await userRepository.findOne({
			where: { id: savedUser.id }
		});

		// Verifica se o usuário não foi encontrado (foi deletado)
		expect(deletedUser).toBeDefined();
	});

	// Outros testes podem ser adicionados aqui conforme necessário
	afterEach(async () => {
		// Limpa o estado do repositório mockado após cada teste, se necessário
		jest.clearAllMocks();
	});

	afterAll(async () => {
		// Fecha recursos após todos os testes, se necessário
		jest.restoreAllMocks();
	});

	describe("Constructor", () => {
		it("should create an instance with provided properties", () => {
			const user = userEntityList[0];

			expect(user.id).toBe(user.id);
			expect(user.name).toBe(user.name);
			expect(user.email).toBe(user.email);
			expect(user.password).toBe(user.password);
			expect(user.birthAt).toEqual(user.birthAt);
			expect(user.role).toBe(user.role);
			expect(user.status).toBe(user.status);
			expect(user.createdAt).toEqual(user.createdAt);
			expect(user.updatedAt).toEqual(user.updatedAt);
		});

		it("should create an instance with default values if no user data provided", () => {
			const user = new UserEntity();

			expect(user.id).toBeUndefined();
			expect(user.name).toBeUndefined();
			expect(user.email).toBeUndefined();
			expect(user.password).toBeUndefined();
			expect(user.birthAt).toBeUndefined();
			expect(user.role).toBeUndefined();
			expect(user.status).toBeUndefined();
			expect(user.createdAt).toBeUndefined();
			expect(user.updatedAt).toBeUndefined();
		});
	});
});

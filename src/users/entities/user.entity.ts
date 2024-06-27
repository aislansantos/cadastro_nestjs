import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Status } from "../../utils/enums/active.enum";
import { Role } from "../../utils/enums/role.enum";

@Entity({
	name: "users"
})
export class UserEntity {
	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id?: number;

	@Column({
		length: 63
	})
	name: string;

	@Column({
		length: 127,
		unique: true
	})
	email: string;

	@Column({
		length: 127
	})
	password: string;

	@Column({
		type: "date",
		nullable: true
	})
	birthAt?: Date;

	@Column({
		default: Role.User
	})
	role?: number;

	@Column({
		default: Status.active
	})
	status?: number;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	constructor(user?: Partial<UserEntity>) {
		this.id = user?.id;
		this.name = user?.name;
		this.email = user?.email;
		this.password = user?.password;
		this.birthAt = user?.birthAt;
		this.role = user?.role;
		this.status = user?.status;
		this.createdAt = user?.createdAt;
		this.updatedAt = user?.updatedAt;
	}
}

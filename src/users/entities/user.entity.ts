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
	id: number;

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
	birthAt?: string;

	@Column({
		default: Role.User
	})
	role?: number;

	@Column({
		default: Status.active
	})
	status?: number;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;
}

import { PrismaClient } from '@prisma/client';
import { Injectable, Provider } from '@nestjs/common';
import { userRolesMapper } from './mappers/user-upsert-roles.mapper.js';
import { UserId } from '../domain/user.entity.js';
import { UserDto } from '../application/dto/user.dto.js';
import { UserCreateDto } from '../application/dto/user-create.js';
import { UserRepository } from '../application/contracts/user.repository.contract.js';

@Injectable()
export class UserSQLiteRepository implements UserRepository {
	constructor(private readonly _prisma: PrismaClient) {}

	async select(id?: UserId): Promise<UserDto | UserDto[] | null> {
		if (id) {
			const user = await this._prisma.user.findFirst({
				where: { id, deletedAt: null },
				include: { roles: true },
			});

			if (!user) return null;

			return user;
		}

		return this._prisma.user.findMany({
			where: { deletedAt: null },
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				roles: { select: { name: true, descriptor: true, type: true } },
			},
		});
	}

	async insert(user: UserCreateDto): Promise<UserId> {
		const { id } = await this._prisma.user.create({
			data: {
				...user,
				roles: { connectOrCreate: userRolesMapper(user) },
			},
		});

		return id;
	}

	async update(id: UserId, user: UserCreateDto): Promise<void> {
		await this._prisma.user.update({
			where: { id },
			data: {
				...user,
				roles: { connectOrCreate: userRolesMapper(user) },
			},
		});
	}

	async delete(id: UserId): Promise<void> {
		await this._prisma.user.update({
			where: { id },
			data: {
				deletedAt: new Date(),
			},
		});
	}

	static register(): Provider<UserSQLiteRepository> {
		return {
			provide: UserRepository,
			useClass: UserSQLiteRepository,
		};
	}
}

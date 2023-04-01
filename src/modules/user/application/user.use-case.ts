import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto.js';
import { UserUpdateDto } from './dto/user-update.js';
import { UserCreateDto } from './dto/user-create.js';
import { UserRepository } from './contracts/user.repository.contract.js';
import { UserId } from '../domain/user.entity.js';

@Injectable()
export class UserUseCase {
	constructor(private readonly _repository: UserRepository) {}

	get(id?: UserId): Promise<UserDto | UserDto[] | null> {
		return this._repository.select(id);
	}

	create(user: UserCreateDto): Promise<UserId> {
		return this._repository.insert(user);
	}

	update(id: UserId, user: UserUpdateDto): Promise<void> {
		return this._repository.update(id, user);
	}

	delete(id: UserId): Promise<void> {
		return this._repository.delete(id);
	}
}

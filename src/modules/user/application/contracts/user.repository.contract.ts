import { UserDto } from '../dto/user.dto.js';
import { UserUpdateDto } from '../dto/user-update.js';
import { UserCreateDto } from '../dto/user-create.js';
import { UserId } from '../../domain/user.entity.js';

export abstract class UserRepository {
	abstract select(id?: UserId): Promise<UserDto | UserDto[] | null>;

	abstract insert(user: UserCreateDto): Promise<UserId>;

	abstract update(id: UserId, user: UserUpdateDto): Promise<void>;

	abstract delete(id: UserId): Promise<void>;
}

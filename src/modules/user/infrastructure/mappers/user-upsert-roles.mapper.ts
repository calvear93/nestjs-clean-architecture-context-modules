import { Prisma } from '@prisma/client';
import { UserUpdateDto } from '../../application/dto/user-update.js';
import { UserCreateDto } from '../../application/dto/user-create.js';
import { RolType } from '../../../rol/domain/rol.entity.js';

export const userRolesMapper = (
	user: UserCreateDto | UserUpdateDto,
): Prisma.RolCreateOrConnectWithoutUserInput[] | undefined => {
	return user.roles?.map(({ name, descriptor, type }) => ({
		where: { name },
		create: {
			name,
			descriptor: descriptor ?? '',
			type: type ?? RolType.Unknown,
		},
	}));
};

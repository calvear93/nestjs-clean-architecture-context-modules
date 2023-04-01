import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { UserSchema } from '../../domain/user.entity.js';
import { RolDtoSchema } from '../../../rol/application/dto/rol.dto.js';

export const UserDtoSchema = UserSchema.omit({
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
}).extend({
	roles: z.array(RolDtoSchema).optional(),
});

export class UserDto extends createZodDto(UserDtoSchema) {}

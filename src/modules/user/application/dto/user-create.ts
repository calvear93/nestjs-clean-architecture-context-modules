import { createZodDto } from '@anatine/zod-nestjs';
import { UserDtoSchema } from './user.dto.js';

export const UserCreateDtoSchema = UserDtoSchema.omit({
	id: true,
});

export class UserCreateDto extends createZodDto(UserCreateDtoSchema) {}

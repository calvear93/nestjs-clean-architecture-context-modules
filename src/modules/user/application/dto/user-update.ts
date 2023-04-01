import { createZodDto } from '@anatine/zod-nestjs';
import { UserCreateDtoSchema } from './user-create.js';

export const UserUpdateDtoSchema = UserCreateDtoSchema.partial();

export class UserUpdateDto extends createZodDto(UserUpdateDtoSchema) {}

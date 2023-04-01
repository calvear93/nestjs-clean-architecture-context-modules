import { createZodDto } from '@anatine/zod-nestjs';
import { RolSchema } from '../../domain/rol.entity.js';

export const RolDtoSchema = RolSchema.omit({
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
}).partial({
	descriptor: true,
	type: true,
});

export class RolDto extends createZodDto(RolDtoSchema) {}

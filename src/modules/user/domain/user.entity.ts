import { z } from 'zod';
import { RolSchema } from '../../rol/domain/rol.entity.js';
import { TrackableSchema } from '../../_shared/domain/trackable.interface.js';

export const UserSchema = z
	.object({
		id: z.coerce.number(),
		email: z.string().email().describe('principal email'),
		firstName: z.string().describe('first or middlenames'),
		lastName: z.string().nullable().describe('lastname'),
		roles: z.array(RolSchema).optional(),
	})
	.merge(TrackableSchema);

export type User = z.infer<typeof UserSchema>;

export type UserId = User['id'];

export const getUserFullName = ({ firstName, lastName }: User) => {
	return `${firstName} ${lastName}`.trimEnd();
};

import { z } from 'zod';
import { TrackableSchema } from '../../_shared/domain/trackable.interface.js';

export enum RolType {
	Unknown = -1,
	Internal = 100,
	External = 200,
}

export const RolSchema = z
	.object({
		name: z.string().describe('unique name'),
		descriptor: z.string().describe('description'),
		type: z.nativeEnum(RolType).describe('internal or external'),
	})
	.merge(TrackableSchema);

export type Rol = z.infer<typeof RolSchema>;

export type RolId = Rol['name'];

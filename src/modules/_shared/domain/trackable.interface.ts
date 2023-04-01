import { z } from 'zod';

export const TrackableSchema = z.object({
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	deletedAt: z.coerce.date().optional(),
});

export type Trackable = z.infer<typeof TrackableSchema>;

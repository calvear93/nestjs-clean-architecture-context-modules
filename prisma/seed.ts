import { PrismaClient, Prisma } from '@prisma/client';
import { RolType } from '../src/modules/rol/domain/rol.entity.js';

const roles: Prisma.RolCreateInput[] = [
	{
		name: 'user',
		descriptor: 'normal user',
		type: RolType.Internal,
	},
	{
		name: 'collaborator',
		descriptor: 'external user',
		type: RolType.External,
	},
	{
		name: 'admin',
		descriptor: 'administrator',
		type: RolType.Internal,
	},
];

const prisma = new PrismaClient();

for (const role of roles) {
	await prisma.rol.create({
		data: role,
	});
}

await prisma.$disconnect();

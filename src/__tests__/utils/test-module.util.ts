import { Test, TestingModule } from '@nestjs/testing';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ModuleMetadata } from '@nestjs/common';

export const createFastifyTestingModule = async (
	metadata: ModuleMetadata,
): Promise<[TestingModule, NestFastifyApplication]> => {
	const module = await Test.createTestingModule(metadata).compile();

	const app = module.createNestApplication<NestFastifyApplication>(
		new FastifyAdapter(),
	);

	await app.enableVersioning().init();
	await app.getHttpAdapter().getInstance().ready();

	return [module, app];
};

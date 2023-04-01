import { randomUUID } from 'crypto';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { User } from '@prisma/client';
import { TestingModule } from '@nestjs/testing';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpStatus } from '@nestjs/common';
import { createFastifyTestingModule } from './utils/test-module.util.js';
import { UserCreateDto } from '../modules/user/application/dto/user-create.js';
import { AppModule } from '../app.module.js';

describe('Sample', () => {
	let app: NestFastifyApplication;
	let module: TestingModule;

	// hooks
	beforeAll(async () => {
		[module, app] = await createFastifyTestingModule({
			imports: [AppModule],
		});
	});

	afterAll(async () => {
		await app.close();
		await module.close();
	});

	// tests
	test('can POST and GET a user', async () => {
		const user: UserCreateDto = {
			email: `${randomUUID()}@example.com`,
			firstName: 'firstName',
			lastName: 'lastName',
		};

		const { body: userId, statusCode } = await app.inject({
			method: 'POST',
			url: '/v1/user',
			payload: user,
		});

		const response = await app.inject({
			method: 'GET',
			url: `/v1/user/${userId}`,
		});
		const userCreated = response.json<User>();

		expect(statusCode).toBe(HttpStatus.CREATED);
		expect(user.email).toStrictEqual(userCreated.email);
	});
});

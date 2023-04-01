import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { env } from './env.config.js';
import { AppModule } from './app.module.js';

// nest adapter
const app = await NestFactory.create(AppModule, new FastifyAdapter(), {
	cors: true,
});

// api config
app.enableVersioning();
app.setGlobalPrefix(env.APP.API_PREFIX);
app.useGlobalPipes(new ZodValidationPipe());

// swagger config
const document = SwaggerModule.createDocument(
	app,
	new DocumentBuilder().setTitle(env.APP.TITLE).build(),
);
SwaggerModule.setup(env.APP.API_PREFIX, app, document);

// server starts
await app.listen(env.APP.PORT, () =>
	// eslint-disable-next-line no-console
	console.log(
		`\n \x1B[32m➜\x1B[0m Local: \x1B[36mhttp://localhost:${env.APP.PORT}/${env.APP.API_PREFIX}`,
	),
);

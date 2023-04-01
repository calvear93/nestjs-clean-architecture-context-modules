import { Prisma, PrismaClient } from '@prisma/client';
import {
	DynamicModule,
	InjectionToken,
	Module,
	OnModuleDestroy,
} from '@nestjs/common';

export interface PrismaModuleConfig extends Prisma.PrismaClientOptions {
	debug?: boolean;
	global?: boolean;
	useToken?: InjectionToken;
}

/**
 * Prisma ORM client module, exposes PrismaClient.
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries
 *
 * @example
 * ```ts
 *  // app.module.ts
 *  Module({
 *	  imports: [
 *		  PrismaModule.register({
 *			  debug: true,
 *			  datasources: { db: { url: env.DB.STRING_CONNECTION } }
 *		  })
 *	  ],
 *	  controllers: [...],
 *	  providers: [...]
 *  })
 *  export class AppModule {
 *	  ...
 *  }
 *
 *  // any.service.ts
 *  export type AnyServiceGetResult = Prisma.Prisma__UserClient<User | null>;
 *
 *  export class AnyService {
 *	  constructor(private readonly _prisma: PrismaClient) {}
 *
 *	  get(@Query('mail') mail: string): AnyServiceGetResult {
 *		  return this._prisma.user.findFirst({
 *			  where: {
 *				  email: mail
 *			  }
 *		  });
 *	  }
 *  }
 * ```
 */
@Module({})
export class PrismaModule implements OnModuleDestroy {
	onModuleDestroy(): Promise<void> {
		return PrismaModule._prisma.$disconnect();
	}

	/**
	 * Registers the module with configuration.
	 *
	 * @param config - provider config
	 *
	 * @returns module registration
	 */
	static register({
		debug,
		global,
		useToken,
		...optionsArg
	}: PrismaModuleConfig = {}): DynamicModule {
		if (debug) optionsArg.log ??= ['query', 'info', 'warn', 'error'];

		PrismaModule._prisma = new PrismaClient(optionsArg);

		return {
			global,
			module: PrismaModule,
			exports: [PrismaClient],
			providers: [
				{
					provide: useToken ?? PrismaClient,
					useValue: PrismaModule._prisma,
				},
			],
		};
	}

	private static _prisma: PrismaClient;
}

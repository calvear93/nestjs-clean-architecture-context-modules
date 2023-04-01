import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module.js';
import { PrismaModule } from './libs/prisma/prisma.module.js';

@Module({
	imports: [PrismaModule.register({ debug: true, global: true }), UserModule],
})
export class AppModule {}

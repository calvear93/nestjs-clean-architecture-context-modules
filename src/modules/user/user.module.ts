import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/user.controller.js';
import { UserSQLiteRepository } from './infrastructure/user-sqlite.repository.js';
import { UserUseCase } from './application/user.use-case.js';

@Module({
	controllers: [UserController],
	providers: [UserUseCase, UserSQLiteRepository.register()],
})
export class UserModule {}

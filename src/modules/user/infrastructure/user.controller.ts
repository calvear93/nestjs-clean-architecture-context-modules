import { ApiBody, ApiParam } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Logger,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { type UserId } from '../domain/user.entity.js';
import { UserUseCase } from '../application/user.use-case.js';
import { UserDto } from '../application/dto/user.dto.js';
import { UserUpdateDto } from '../application/dto/user-update.js';
import { UserCreateDto } from '../application/dto/user-create.js';
import { ParseOptionalIntPipe } from '../../_shared/infrastructure/transformers/parse-optional-int.pipe.js';

@Controller({
	path: 'user',
	version: '1',
})
export class UserController {
	constructor(private readonly _useCase: UserUseCase) {}

	@Get(':id?')
	@ApiParam({ name: 'id', required: false })
	get(
		@Param('id', ParseOptionalIntPipe) id?: UserId,
	): Promise<UserDto | UserDto[] | null> {
		this._logger.verbose(`searching for ${id ? id : 'all'}`);

		return this._useCase.get(id);
	}

	@Post()
	@ApiBody({ type: UserCreateDto })
	@HttpCode(HttpStatus.CREATED)
	create(@Body() user: UserCreateDto): Promise<UserId> {
		this._logger.verbose(`creating user ${user.email}`);

		return this._useCase.create(user);
	}

	@Patch(':id')
	@ApiParam({ name: 'id' })
	@ApiBody({ type: UserUpdateDto })
	update(
		@Param('id', ParseIntPipe) id: UserId,
		@Body() user: UserUpdateDto,
	): Promise<void> {
		this._logger.verbose(`updating user ${id}`);

		return this._useCase.update(id, user);
	}

	@Delete(':id')
	@ApiParam({ name: 'id' })
	delete(@Param('id', ParseIntPipe) id: UserId): Promise<void> {
		this._logger.verbose(`deleting user ${id}`);

		return this._useCase.delete(id);
	}

	private readonly _logger = new Logger(UserController.name);
}

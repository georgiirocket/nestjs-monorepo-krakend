import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SERVICE_NAMES } from '@app/libs/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '@app/libs/dto/user/user.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { USER_PATTERNS } from '@app/libs/constants/patterns/user';
import { EntityDto } from '@app/libs/dto/entity.dto';
import { CreateUserDto } from '@app/libs/dto/user/create.dto';
import { UpdateUserDto } from '@app/libs/dto/user/update.dto';
import { DeleteUserDto } from '@app/libs/dto/user/delete.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(SERVICE_NAMES.USER) private readonly userService: ClientProxy,
  ) {}

  /**
   * Get list
   */
  @ApiOkResponse({ type: [UserDto] })
  @Get('list')
  async getList(): Promise<UserDto[]> {
    return await firstValueFrom(
      this.userService.send<UserDto[]>(USER_PATTERNS.GET_USERS, {}).pipe(
        catchError((error: Error) => {
          throw new InternalServerErrorException(error);
        }),
      ),
    );
  }

  /**
   * Get view
   */
  @ApiOkResponse({ type: UserDto })
  @Get('view/:id')
  async getView(@Param() { id }: { id: string }): Promise<UserDto> {
    return await firstValueFrom(
      this.userService
        .send<
          UserDto,
          EntityDto
        >(USER_PATTERNS.GET_USER, { entityId: Number(id) })
        .pipe(
          catchError((error) => {
            throw new NotFoundException(error);
          }),
        ),
    );
  }

  /**
   * Create entity
   */
  @ApiOkResponse({ type: UserDto })
  @Post('create')
  async createEntity(@Body() data: CreateUserDto): Promise<UserDto> {
    return await firstValueFrom(
      this.userService.send<UserDto>(USER_PATTERNS.CREATE_USER, data).pipe(
        catchError((error) => {
          throw new InternalServerErrorException(error);
        }),
      ),
    );
  }

  /**
   * Update entity
   */
  @ApiOkResponse({ type: UserDto })
  @Patch('update')
  async updateEntity(@Body() data: UpdateUserDto): Promise<UserDto> {
    return await firstValueFrom(
      this.userService.send<UserDto>(USER_PATTERNS.UPDATE_USER, data).pipe(
        catchError((error) => {
          throw new InternalServerErrorException(error);
        }),
      ),
    );
  }

  /**
   * Update entity
   */
  @ApiOkResponse({ type: UserDto })
  @Delete('delete')
  async deleteEntity(@Body() data: DeleteUserDto): Promise<UserDto> {
    return await firstValueFrom(
      this.userService.send<UserDto>(USER_PATTERNS.DELETE_USER, data).pipe(
        catchError((error) => {
          throw new InternalServerErrorException(error);
        }),
      ),
    );
  }
}

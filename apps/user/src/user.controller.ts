import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserDto } from '@app/libs/dto/user/user.dto';
import { EntityDto } from '@app/libs/dto/entity.dto';
import { CreateUserDto } from '@app/libs/dto/user/create.dto';
import { UpdateUserDto } from '@app/libs/dto/user/update.dto';
import { DeleteUserDto } from '@app/libs/dto/user/delete.dto';
import { USER_PATTERNS } from '@app/libs/constants/patterns/user';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller
 */
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get users
   */
  @ApiOkResponse({ type: [UserDto] })
  @Get('list')
  @MessagePattern(USER_PATTERNS.GET_USERS)
  async getList(): Promise<UserDto[]> {
    return await this.userService.getList();
  }

  /**
   * Get user by id
   */
  @ApiOkResponse({ type: UserDto })
  @Get('view/:id')
  @MessagePattern(USER_PATTERNS.GET_USER)
  async getView(data: EntityDto): Promise<UserDto> {
    const user = await this.userService.getView(data.entityId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  /**
   * Create users
   */
  @ApiOkResponse({ type: UserDto })
  @Post('create')
  @MessagePattern(USER_PATTERNS.CREATE_USER)
  async createEntity(data: CreateUserDto): Promise<UserDto> {
    const existUser = await this.userService.checkExistUser(data.name);

    if (existUser) {
      throw new Error('Choose another user');
    }

    return this.userService.createEntity(data);
  }

  /**
   * Update user
   * @param data
   */
  @ApiOkResponse({ type: UserDto })
  @Patch('update')
  @MessagePattern(USER_PATTERNS.UPDATE_USER)
  async updateEntity(data: UpdateUserDto): Promise<UserDto> {
    const existUser = await this.userService.checkExistUser(data.name);

    if (existUser) {
      throw new Error('Choose another user');
    }

    return this.userService.updateEntity(data);
  }

  /**
   * Delete user
   * @param data
   */
  @ApiOkResponse({ type: UserDto })
  @Delete('delete')
  @MessagePattern(USER_PATTERNS.DELETE_USER)
  async deleteEntity(data: DeleteUserDto): Promise<UserDto> {
    return this.userService.deleteUser(data);
  }
}

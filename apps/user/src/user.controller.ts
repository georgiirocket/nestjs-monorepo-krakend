import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@app/libs/decorators/roles';
import { Role } from '@app/libs/models/user/model';
import { JwtAuthGuard } from '@app/libs/guards/jwt-auth';
import { RoleGuard } from '@app/libs/guards/role';
import { TokenPayloadParams } from '@app/libs/decorators/token-payload';
import { TokenPayload } from '@app/libs/dto/auth/token-payload';
import { catchError, firstValueFrom } from 'rxjs';
import { AUTH_PATTERNS } from '@app/libs/constants/patterns/auth';
import { SERVICE_NAMES } from '@app/libs/constants/services';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from '@app/libs/dto/user/user.dto';
import { EntityDto } from '@app/libs/dto/entity.dto';
import { FILE_PATTERNS } from '@app/libs/constants/patterns/file';

/**
 * Controller
 */
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(SERVICE_NAMES.AUTH) private readonly authServices: ClientProxy,
    @Inject(SERVICE_NAMES.FILE) private readonly fileServices: ClientProxy,
  ) {}

  /**
   * Get users
   */
  @ApiOkResponse({ type: [UserDto] })
  @ApiBearerAuth()
  @Get('list')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getList(): Promise<UserDto[]> {
    return await this.userService.getList();
  }

  /**
   * Get user by id
   */
  @ApiOkResponse({ type: UserDto })
  @ApiBearerAuth()
  @Get('view')
  @UseGuards(JwtAuthGuard)
  async getView(@TokenPayloadParams() data: TokenPayload): Promise<UserDto> {
    const user = await this.userService.getView(data.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Create users
   */
  @ApiOkResponse({ type: UserDto })
  @Post('create')
  async createEntity(@Body() data: CreateUserDto): Promise<UserDto> {
    const existUser = await this.userService.checkExistUser(data.email);

    if (existUser) {
      throw new BadRequestException('Choose another user');
    }

    const hash = await firstValueFrom(
      this.authServices
        .send<string, string>(AUTH_PATTERNS.CREATE_HASH_PASSWORD, data.password)
        .pipe(
          catchError((error) => {
            throw new InternalServerErrorException(error);
          }),
        ),
    );

    const userCount = await this.userService.getEntitiesCount();

    return this.userService.createEntity(
      { email: data.email, password: hash },
      userCount === 0,
    );
  }

  /**
   * Update user
   */
  @ApiOkResponse({ type: UserDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateEntity(
    @Body() userData: UpdateUserDto,
    @TokenPayloadParams() data: TokenPayload,
  ): Promise<UserDto> {
    const { email, password } = userData;

    if (email && (await this.userService.checkExistUser(email))) {
      throw new Error('Choose another user');
    }

    if (password) {
      userData.password = await firstValueFrom(
        this.authServices
          .send<string, string>(AUTH_PATTERNS.CREATE_HASH_PASSWORD, password)
          .pipe(
            catchError((error) => {
              throw new InternalServerErrorException(error);
            }),
          ),
      );
    }

    return this.userService.updateEntity(data.userId, userData);
  }

  /**
   * Delete user
   * @param data
   */
  @ApiOkResponse({ type: UserDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteEntity(
    @TokenPayloadParams() { userId }: TokenPayload,
  ): Promise<UserDto> {
    const user = await this.userService.deleteUser(userId);

    this.fileServices.emit<string, EntityDto>(FILE_PATTERNS.REMOVE_BY_USER_ID, {
      entityId: userId,
    });

    return user;
  }
}

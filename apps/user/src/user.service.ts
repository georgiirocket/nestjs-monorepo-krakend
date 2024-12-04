import { PrismaService } from '@app/libs/modules/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Role, UserModel } from '@app/libs/models/user/model';
import { userSelect } from './constants/user-select';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from '@app/libs/dto/user/user.dto';

/**
 * Service
 */
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Get entities
   */
  async getList(): Promise<UserDto[]> {
    return this.prismaService.user.findMany({
      select: userSelect,
    });
  }

  /**
   * Get entity
   * @param id
   */
  async getView(id: string): Promise<UserDto | null> {
    return this.prismaService.user.findUnique({
      where: { id },
      select: userSelect,
    });
  }

  /**
   * Create entity
   */
  async createEntity(
    data: CreateUserDto,
    isFirstUser: boolean,
  ): Promise<UserDto> {
    return this.prismaService.user.create({
      data: { ...data, ...(isFirstUser && { role: Role.ADMIN }) },
      select: userSelect,
    });
  }

  /**
   * Update entity
   */
  async updateEntity(id: string, data: UpdateUserDto): Promise<UserDto> {
    return this.prismaService.user.update({
      where: { id: id },
      data: {
        ...(data.email && { email: data.email }),
        ...(data.password && { email: data.password }),
        ...(data.imageUrl && { email: data.imageUrl }),
      },
    });
  }

  /**
   * Delete entity
   */
  async deleteUser(id: string): Promise<UserDto> {
    return this.prismaService.user.delete({
      where: { id },
      select: userSelect,
    });
  }

  /**
   * Check exist user
   * @param email
   */
  async checkExistUser(email: string): Promise<UserModel | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  /**
   * Get entities count
   */
  async getEntitiesCount(): Promise<number> {
    return this.prismaService.user.count();
  }
}

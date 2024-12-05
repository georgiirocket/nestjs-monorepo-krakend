import { PrismaService } from '@app/libs/modules/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

/**
 * Service
 */
@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Get entities
   */
  async getList(userId: string): Promise<PostDto[]> {
    return this.prismaService.post.findMany({ where: { authorId: userId } });
  }

  /**
   * Get entity
   */
  async getView(userId: string, id: string): Promise<PostDto | null> {
    return this.prismaService.post.findUnique({
      where: { id, authorId: userId },
    });
  }

  /**
   * Create entity
   */
  async createEntity(userId: string, data: CreatePostDto): Promise<PostDto> {
    return this.prismaService.post.create({
      data: { authorId: userId, ...data },
    });
  }

  /**
   * Update entity
   */
  async updateEntity(userId: string, data: UpdatePostDto): Promise<PostDto> {
    return this.prismaService.post.update({
      where: { id: data.id, authorId: userId },
      data: { title: data.title, description: data.description },
    });
  }

  /**
   * Delete entity
   */
  async deleteEntity(userId: string, postId: string): Promise<PostDto> {
    return this.prismaService.post.delete({
      where: { id: postId, authorId: userId },
    });
  }
}

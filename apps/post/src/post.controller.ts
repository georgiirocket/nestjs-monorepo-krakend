import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostDto } from './dto/post.dto';
import { JwtAuthGuard } from '@app/libs/guards/jwt-auth';
import { TokenPayloadParams } from '@app/libs/decorators/token-payload';
import { TokenPayload } from '@app/libs/dto/auth/token-payload';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * Get posts
   */
  @ApiOkResponse({ type: [PostDto] })
  @Get('list')
  async getList(
    @TokenPayloadParams() { userId }: TokenPayload,
  ): Promise<PostDto[]> {
    return await this.postService.getList(userId);
  }

  /**
   * Get post by id
   */
  @ApiOkResponse({ type: PostDto })
  @Get('view/:postId')
  async getView(
    @TokenPayloadParams() { userId }: TokenPayload,
    @Param() { postId }: { postId: string },
  ): Promise<PostDto> {
    const post = await this.postService.getView(userId, postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  /**
   * Create post
   */
  @ApiOkResponse({ type: PostDto })
  @Post('create')
  async createEntity(
    @TokenPayloadParams() { userId }: TokenPayload,
    @Body() data: CreatePostDto,
  ): Promise<PostDto> {
    return this.postService.createEntity(userId, data);
  }

  /**
   * Update post
   */
  @ApiOkResponse({ type: PostDto })
  @Patch('update')
  async updateEntity(
    @TokenPayloadParams() { userId }: TokenPayload,
    @Body() data: UpdatePostDto,
  ): Promise<PostDto> {
    return this.postService.updateEntity(userId, data);
  }

  /**
   * Delete post
   */
  @ApiOkResponse({ type: PostDto })
  @Delete('delete/:postId')
  async deleteEntity(
    @TokenPayloadParams() { userId }: TokenPayload,
    @Param() { postId }: { postId: string },
  ): Promise<PostDto> {
    return this.postService.deleteEntity(userId, postId);
  }
}

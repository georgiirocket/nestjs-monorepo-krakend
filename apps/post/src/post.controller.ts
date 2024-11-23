import { Controller, Inject } from '@nestjs/common';
import { PostService } from './post.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { EntityDto } from '@app/libs/dto/entity.dto';
import { POST_PATTERNS } from '@app/libs/constants/patterns/post';
import { PostDto } from '@app/libs/dto/post/post.dto';
import { CreatePostDto } from '@app/libs/dto/post/create.dto';
import { UpdatePostDto } from '@app/libs/dto/post/update.dto';
import { DeletePostDto } from '@app/libs/dto/post/delete.dto';
import { SERVICE_NAMES } from '@app/libs/constants/services';
import { catchError, firstValueFrom } from 'rxjs';
import { UserDto } from '@app/libs/dto/user/user.dto';
import { USER_PATTERNS } from '@app/libs/constants/patterns/user';

@Controller()
export class PostController {
  constructor(
    private readonly postService: PostService,
    @Inject(SERVICE_NAMES.USER) private readonly userService: ClientProxy,
  ) {}

  /**
   * Get user by id
   * @param id
   * @private
   */
  private getUserById(id: number): Promise<UserDto> {
    return firstValueFrom(
      this.userService
        .send<UserDto, EntityDto>(USER_PATTERNS.GET_USER, { entityId: id })
        .pipe(
          catchError((error) => {
            throw new Error(error);
          }),
        ),
    );
  }

  /**
   * Get posts
   */
  @MessagePattern(POST_PATTERNS.GET_POSTS)
  async getList(): Promise<PostDto[]> {
    return await this.postService.getList();
  }

  /**
   * Get post by id
   */
  @MessagePattern(POST_PATTERNS.GET_POST)
  async getView(data: EntityDto): Promise<PostDto> {
    const post = await this.postService.getView(data.entityId);

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  }

  /**
   * Create post
   */
  @MessagePattern(POST_PATTERNS.CREATE_POST)
  async createEntity(data: CreatePostDto): Promise<PostDto> {
    await this.getUserById(data.authorId);
    return this.postService.createEntity(data);
  }

  /**
   * Update post
   * @param data
   */
  @MessagePattern(POST_PATTERNS.UPDATE_POST)
  async updateEntity(data: UpdatePostDto): Promise<PostDto> {
    return this.postService.updateEntity(data);
  }

  /**
   * Delete post
   * @param data
   */
  @MessagePattern(POST_PATTERNS.DELETE_POST)
  async deleteEntity(data: DeletePostDto): Promise<PostDto> {
    return this.postService.deleteUser(data);
  }
}

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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SERVICE_NAMES } from '@app/libs/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { PostDto } from '@app/libs/dto/post/post.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { POST_PATTERNS } from '@app/libs/constants/patterns/post';
import { EntityDto } from '@app/libs/dto/entity.dto';
import { CreatePostDto } from '@app/libs/dto/post/create.dto';
import { UpdatePostDto } from '@app/libs/dto/post/update.dto';
import { DeletePostDto } from '@app/libs/dto/post/delete.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(
    @Inject(SERVICE_NAMES.POST) private readonly postService: ClientProxy,
  ) {}

  /**
   * Get list
   */
  @ApiOkResponse({ type: [PostDto] })
  @Get('list')
  async getList(): Promise<PostDto[]> {
    return await firstValueFrom(
      this.postService.send<PostDto[]>(POST_PATTERNS.GET_POSTS, {}).pipe(
        catchError((error: Error) => {
          throw new InternalServerErrorException(error);
        }),
      ),
    );
  }

  /**
   * Get view
   */
  @ApiOkResponse({ type: PostDto })
  @Get('view/:id')
  async getView(@Param() { id }: { id: string }): Promise<PostDto> {
    return await firstValueFrom(
      this.postService
        .send<
          PostDto,
          EntityDto
        >(POST_PATTERNS.GET_POST, { entityId: Number(id) })
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
  @ApiOkResponse({ type: PostDto })
  @Post('create')
  async createEntity(@Body() data: CreatePostDto): Promise<PostDto> {
    return await firstValueFrom(
      this.postService.send<PostDto>(POST_PATTERNS.CREATE_POST, data).pipe(
        catchError((error) => {
          throw new InternalServerErrorException(error);
        }),
      ),
    );
  }

  /**
   * Update entity
   */
  @ApiOkResponse({ type: PostDto })
  @Patch('update')
  async updateEntity(@Body() data: UpdatePostDto): Promise<PostDto> {
    return await firstValueFrom(
      this.postService.send<PostDto>(POST_PATTERNS.UPDATE_POST, data).pipe(
        catchError((error) => {
          throw new InternalServerErrorException(error);
        }),
      ),
    );
  }

  /**
   * Update entity
   */
  @ApiOkResponse({ type: PostDto })
  @Delete('delete')
  async deleteEntity(@Body() data: DeletePostDto): Promise<PostDto> {
    return await firstValueFrom(
      this.postService.send<PostDto>(POST_PATTERNS.DELETE_POST, data).pipe(
        catchError((error) => {
          throw new InternalServerErrorException(error);
        }),
      ),
    );
  }
}

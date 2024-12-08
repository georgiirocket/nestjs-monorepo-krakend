import {
  Controller,
  Delete,
  Get,
  Header,
  NotFoundException,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import type { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/libs/guards/jwt-auth';
import { TokenPayloadParams } from '@app/libs/decorators/token-payload';
import { TokenPayload } from '@app/libs/dto/auth/token-payload';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/file.dto';

@ApiTags('File')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * View
   */
  @ApiOperation({ summary: 'Get file', description: 'Return stream' })
  @Header('Accept-Ranges', 'bytes')
  @Get('view/:filename')
  async getView(
    @Param() { filename }: { filename: string },
  ): Promise<StreamableFile> {
    const fileData = await this.fileService.getFileData(filename);

    if (!fileData) {
      throw new NotFoundException('File not found');
    }

    return new StreamableFile(this.fileService.getStream(fileData.filename), {
      type: fileData.mimetype,
      disposition: `attachment; filename="${fileData.originalname}"`,
      length: fileData.size,
    });
  }

  /**
   * Download file
   */
  @ApiOperation({
    summary: 'Download file',
    description: 'Return stream with download content-type',
  })
  @Get('download/:filename')
  async downloadFile(
    @Param() { filename }: { filename: string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const fileData = await this.fileService.getFileData(filename);

    if (!fileData) {
      throw new NotFoundException('File not found');
    }

    res.set({
      'Content-Type': fileData.mimetype,
      'Content-Disposition': `attachment; filename="${fileData.originalname}"`,
    });

    return new StreamableFile(this.fileService.getStream(filename));
  }

  /**
   * Create file
   */
  @ApiOperation({ summary: 'Create file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({ type: FileDto })
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @TokenPayloadParams() { userId }: TokenPayload,
  ): Promise<FileDto> {
    const fileData = await this.fileService.createDataFile({
      originalname: file.originalname,
      filename: file.filename,
      fieldname: file.fieldname,
      destination: file.destination,
      path: file.path,
      encoding: file.encoding,
      mimetype: file.mimetype,
      size: file.size,
      authorId: userId,
    });

    return FileDto.omitFileModel(fileData);
  }

  /**
   * Delete entity
   */
  @Delete('delete/:id')
  @ApiOkResponse({ type: FileDto })
  async deleteEntity(
    @Param() { id }: { id: string },
    @TokenPayloadParams() { userId }: TokenPayload,
  ): Promise<FileDto> {
    const fileData = await this.fileService.deleteFile(userId, id);

    return FileDto.omitFileModel(fileData);
  }
}

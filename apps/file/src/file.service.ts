import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/libs/modules/database/prisma.service';
import { FileModel } from '@app/libs/models/file/model';
import { createReadStream } from 'fs';
import { join } from 'path';
import { destination } from '@app/libs/constants';

@Injectable()
export class FileService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Get file data
   * @param filename
   */
  async getFileData(filename: string): Promise<FileModel | null> {
    return this.prismaService.file.findFirst({ where: { filename } });
  }

  /**
   * Create data file
   * @param file
   */
  async createDataFile(
    file: Omit<FileModel, 'id' | 'createdAt' | 'updatedAt' | 'isDelete'>,
  ): Promise<FileModel> {
    return this.prismaService.file.create({ data: file });
  }

  /**
   * Delete file
   * @param authorId
   * @param id
   */
  async deleteFile(authorId: string, id: string): Promise<FileModel> {
    return this.prismaService.file.update({
      where: { id, authorId },
      data: { isDelete: true },
    });
  }

  /**
   * Delete by author id
   * @param authorId
   */
  async deleteByAuthorId(authorId: string): Promise<void> {
    await this.prismaService.file.updateMany({
      where: { authorId },
      data: { isDelete: true },
    });
  }

  /**
   * Get stream
   */
  getStream(filename: string) {
    return createReadStream(this.getPath(filename));
  }

  /**
   * Get path
   * @param fileName
   */
  getPath(fileName: string): string {
    return join(process.cwd(), `${destination}/${fileName}`);
  }
}

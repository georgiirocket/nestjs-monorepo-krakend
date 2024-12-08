import { Injectable, Logger } from '@nestjs/common';
import { unlink } from 'fs';
import { join } from 'path';
import { PrismaService } from '@app/libs/modules/database/prisma.service';
import { destination } from '@app/libs/constants';
import { FileModel } from '@app/libs/models/file/model';

@Injectable()
export class CronService {
  private readonly logger = new Logger('FILE_CRON');
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Get files (isDelete true)
   */
  private async getFiles(): Promise<FileModel[]> {
    return this.prismaService.file.findMany({ where: { isDelete: true } });
  }

  /**
   * Get entity (isDelete true)
   */
  private async removeEntity(id: string): Promise<void> {
    await this.prismaService.file.delete({ where: { id } });
  }

  /**
   * Clear storage
   */
  private async clearStorage(filename: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      unlink(join(process.cwd(), `${destination}/${filename}`), (error) => {
        if (error) {
          this.logger.error(
            `Error while clearing storage: ${error.message}`,
            error.stack,
          );

          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  /**
   * Remove files from storage
   */
  public async removeFilesFromStorage(): Promise<void> {
    const files = await this.getFiles();

    for (const file of files) {
      const isClear = await this.clearStorage(file.filename);

      if (isClear) {
        await this.removeEntity(file.id);
      }

      this.logger.log(`File ${file.filename} removed from storage`);
    }
  }
}

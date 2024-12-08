import { Controller, UseFilters } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ExceptionUpFilter } from '@app/libs/filters/exception-up.filter';
import { SERVICE_NAMES } from '@app/libs/constants/services';
import { FileService } from './file.service';
import { FILE_PATTERNS } from '@app/libs/constants/patterns/file';
import { EntityDto } from '@app/libs/dto/entity.dto';

@Controller()
@UseFilters(new ExceptionUpFilter(SERVICE_NAMES.FILE))
export class CommunicationController {
  constructor(private readonly fileService: FileService) {}

  /**
   * Remove by user id
   */
  @EventPattern(FILE_PATTERNS.REMOVE_BY_USER_ID)
  async removeByUserId({ entityId }: EntityDto): Promise<void> {
    void this.fileService.deleteByAuthorId(entityId);
  }
}

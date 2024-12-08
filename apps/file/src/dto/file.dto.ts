import { OmitType } from '@nestjs/swagger';
import { FileModel } from '@app/libs/models/file/model';
import { omit } from 'lodash';

export class FileDto extends OmitType(FileModel, ['destination', 'path']) {
  /**
   * Omit file model
   * @param file
   */
  static omitFileModel(file: FileModel): FileDto {
    return omit(file, ['destination', 'path']);
  }
}

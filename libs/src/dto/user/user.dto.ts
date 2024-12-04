import { OmitType } from '@nestjs/swagger';
import { UserModel } from '@app/libs/models/user/model';
import { omit } from 'lodash';

export class UserDto extends OmitType(UserModel, ['password']) {
  /**
   * Omit password
   * @param user
   */
  static omitPassword(user: UserModel): UserDto {
    return omit(user, ['password']);
  }
}

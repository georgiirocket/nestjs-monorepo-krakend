import { OmitType } from '@nestjs/swagger';
import { UserModel } from '@app/libs/models/user/model';

export class UserDto extends OmitType(UserModel, ['password']) {}

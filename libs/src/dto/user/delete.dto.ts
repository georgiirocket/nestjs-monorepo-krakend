import { PickType } from '@nestjs/swagger';
import { UpdateUserDto } from './update.dto';

/**
 * Delete dto
 */
export class DeleteUserDto extends PickType(UpdateUserDto, ['id']) {}

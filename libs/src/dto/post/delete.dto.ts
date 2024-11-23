import { PickType } from '@nestjs/swagger';
import { UpdatePostDto } from './update.dto';

/**
 * Delete dto
 */
export class DeletePostDto extends PickType(UpdatePostDto, ['id']) {}

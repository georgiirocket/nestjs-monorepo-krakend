import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity dto
 */
export class EntityDto {
  @ApiProperty({ example: 'string' })
  entityId: string;
}

import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity dto
 */
export class EntityDto {
  @ApiProperty({ example: 1 })
  entityId: number;
}

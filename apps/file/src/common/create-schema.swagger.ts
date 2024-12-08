import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const createSchemaSwagger: SchemaObject = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
  },
};

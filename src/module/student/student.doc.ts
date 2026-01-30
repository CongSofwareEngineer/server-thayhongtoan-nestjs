import { ApiHeaderOptions, ApiParamOptions, ApiBodyOptions } from '@nestjs/swagger'

export const StudentDoc = {
  authorization: {
    name: 'authorization',
    required: true,
    description: 'Bearer token for authentication',
  } as ApiHeaderOptions,

  idParam: {
    name: 'id',
    required: true,
    description: 'Student ID',
  } as ApiParamOptions,

  createBody: {
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Nguyen Van A' },
        age: { type: 'number', example: 10 },
        idClass: { type: 'string', example: '65b8f...', nullable: true },
        idParent: { type: 'string', example: '65b8f...', nullable: true },

        status: { type: 'string', enum: ['active', 'stop'], default: 'active' },
        image: { type: 'string', example: 'https://...', nullable: true },
      },
      required: ['name', 'age'],
    },
  } as ApiBodyOptions,

  updateBody: {
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        idClass: { type: 'string' },
        idParent: { type: 'string' },
        status: { type: 'string', enum: ['active', 'stop'] },
        image: { type: 'string', nullable: true },
      },
    },
  } as ApiBodyOptions,
}

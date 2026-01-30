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
        idClass: { type: 'string', example: '65b8f...' },
        status: { type: 'string', enum: ['active', 'stop'], default: 'active' },
        numberPhoneParent: { type: 'string', example: '0987654321' },
        image: { type: 'string', example: 'https://...', nullable: true },
      },
      required: ['name', 'age', 'idClass', 'numberPhoneParent'],
    },
  } as ApiBodyOptions,

  updateBody: {
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        idClass: { type: 'string' },
        status: { type: 'string', enum: ['active', 'stop'] },
        numberPhoneParent: { type: 'string' },
        image: { type: 'string', nullable: true },
      },
    },
  } as ApiBodyOptions,
}

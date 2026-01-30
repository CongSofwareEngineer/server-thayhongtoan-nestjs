import { ApiHeaderOptions, ApiParamOptions, ApiBodyOptions } from '@nestjs/swagger'

export const ClassDoc = {
  authorization: {
    name: 'authorization',
    required: true,
    description: 'Bearer token for authentication',
  } as ApiHeaderOptions,

  idParam: {
    name: 'id',
    required: true,
    description: 'Class ID',
  } as ApiParamOptions,

  createBody: {
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Class 1A' },
        price: { type: 'number', example: 500000 },
        startTime: { type: 'string', example: '08:00' },
        endTime: { type: 'string', example: '10:00' },
        numberStudent: { type: 'number', example: 20 },
        note: { type: 'string', nullable: true },
        attributes: { type: 'object', nullable: true },
      },
      required: ['name', 'price', 'numberStudent'],
    },
  } as ApiBodyOptions,

  updateBody: {
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        price: { type: 'number' },
        startTime: { type: 'string' },
        endTime: { type: 'string' },
        numberStudent: { type: 'number' },
        note: { type: 'string', nullable: true },
        attributes: { type: 'object', nullable: true },
      },
    },
  } as ApiBodyOptions,
}

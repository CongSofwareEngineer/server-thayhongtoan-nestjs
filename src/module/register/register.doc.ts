import { ApiHeaderOptions, ApiParamOptions, ApiBodyOptions } from '@nestjs/swagger'

export const RegisterDoc = {
  authorization: {
    name: 'authorization',
    required: true,
    description: 'Bearer token for authentication',
  } as ApiHeaderOptions,

  idParam: {
    name: 'id',
    required: true,
    description: 'Registration ID',
  } as ApiParamOptions,

  createBody: {
    schema: {
      type: 'object',
      properties: {
        phoneNumber: { type: 'string', example: '0987654321' },
        name: { type: 'string', example: 'Nguyen Thi C' },
        idChildren: { type: 'array', items: { type: 'string' }, example: ['65b8f...', '65b8f...'] },
        address: { type: 'string', nullable: true },
        price: { type: 'number', example: 1000000 },
        note: { type: 'string', nullable: true },
      },
      required: ['phoneNumber', 'name', 'idChildren', 'price'],
    },
  } as ApiBodyOptions,

  updateBody: {
    schema: {
      type: 'object',
      properties: {
        phoneNumber: { type: 'string' },
        name: { type: 'string' },
        idChildren: { type: 'array', items: { type: 'string' } },
        address: { type: 'string', nullable: true },
        price: { type: 'number' },
        note: { type: 'string', nullable: true },
      },
    },
  } as ApiBodyOptions,
}

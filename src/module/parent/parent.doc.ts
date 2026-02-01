import { ApiHeaderOptions, ApiParamOptions, ApiBodyOptions, ApiQueryOptions } from '@nestjs/swagger'

export const ParentDoc = {
  authorization: {
    name: 'authorization',
    required: true,
    description: 'Bearer token for authentication',
  } as ApiHeaderOptions,

  idParam: {
    name: 'id',
    required: true,
    description: 'Parent ID',
  } as ApiParamOptions,

  queryName: {
    name: 'name',
    required: false,
    description: 'Search by name',
  } as ApiQueryOptions,

  queryPhone: {
    name: 'phone',
    required: false,
    description: 'Search by phone',
  } as ApiQueryOptions,

  createBody: {
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Nguyen Van B' },
        phone: { type: 'string', example: '0123456789' },
        address: { type: 'string', example: '123 Street, City' },
        idStudents: { type: 'array', items: { type: 'string' }, example: [] },
        note: { type: 'string', nullable: true },
      },
      required: ['name', 'phone'],
    },
  } as ApiBodyOptions,

  updateBody: {
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        phone: { type: 'string' },
        address: { type: 'string' },
        idStudents: { type: 'array', items: { type: 'string' } },
        note: { type: 'string', nullable: true },
      },
    },
  } as ApiBodyOptions,
}

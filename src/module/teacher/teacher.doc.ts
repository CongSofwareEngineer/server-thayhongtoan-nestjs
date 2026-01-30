import { ApiHeaderOptions, ApiParamOptions, ApiBodyOptions } from '@nestjs/swagger'

export const TeacherDoc = {
  authorization: {
    name: 'authorization',
    required: true,
    description: 'Bearer token for authentication',
  } as ApiHeaderOptions,

  idParam: {
    name: 'id',
    required: true,
    description: 'Teacher ID',
  } as ApiParamOptions,

  loginBody: {
    schema: {
      type: 'object',
      properties: {
        sdt: { type: 'string', example: '0123456789' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['sdt', 'password'],
    },
  } as ApiBodyOptions,

  createBody: {
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Tran Van B' },
        sdt: { type: 'string', example: '0123456789' },
        password: { type: 'string', example: 'password123' },
        isAdmin: { type: 'boolean', default: false },
        age: { type: 'number', example: 30 },
        sex: { type: 'boolean', default: true, description: 'true: male, false: female' },
        image: { type: 'string', example: 'https://...', nullable: true },
      },
      required: ['name', 'sdt', 'password', 'isAdmin', 'age', 'sex'],
    },
  } as ApiBodyOptions,

  updateBody: {
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        sdt: { type: 'string' },
        password: { type: 'string' },
        isAdmin: { type: 'boolean' },
        age: { type: 'number' },
        sex: { type: 'boolean', description: 'true: male, false: female' },
        image: { type: 'string', nullable: true },
      },
    },
  } as ApiBodyOptions,
}

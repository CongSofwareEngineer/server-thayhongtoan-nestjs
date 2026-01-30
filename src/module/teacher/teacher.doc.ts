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
        data: {
          type: 'string',
          description: 'Encrypted data containing: sdt, password',
        },
      },
    },
  } as ApiBodyOptions,

  createBody: {
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'string',
          description: 'Encrypted data containing: name, sdt, password, isAdmin, age, sex (male/female/other), image (optional)',
        },
      },
    },
  } as ApiBodyOptions,

  updateBody: {
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'string',
          description: 'Encrypted data containing: name, sdt, password, isAdmin, age, sex (male/female/other), image (optional)',
        },
      },
    },
  } as ApiBodyOptions,
}

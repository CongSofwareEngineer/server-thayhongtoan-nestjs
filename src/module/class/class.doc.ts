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
        data: {
          type: 'string',
          description: 'Encrypted data containing: name, price, startTime, endTime, numberStudent, note (optional), attributes (optional)',
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
          description: 'Encrypted data containing: name, price, startTime, endTime, numberStudent, note (optional), attributes (optional)',
        },
      },
    },
  } as ApiBodyOptions,
}

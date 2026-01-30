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
        data: {
          type: 'string',
          description: 'Encrypted data containing: phoneNumber, name, idChildren (array), address (optional), price, note (optional)',
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
          description: 'Encrypted data containing: phoneNumber, name, idChildren (array), address (optional), price, note (optional)',
        },
      },
    },
  } as ApiBodyOptions,
}

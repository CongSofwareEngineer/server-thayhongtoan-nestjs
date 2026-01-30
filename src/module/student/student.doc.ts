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
        data: {
          type: 'string',
          description: 'Encrypted data containing: image (optional), name, age, idClass, status (active/stop), numberPhoneParent',
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
          description: 'Encrypted data containing: image (optional), name, age, idClass, status (active/stop), numberPhoneParent',
        },
      },
    },
  } as ApiBodyOptions,
}

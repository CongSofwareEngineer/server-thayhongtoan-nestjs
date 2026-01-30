import { ApiHeaderOptions, ApiParamOptions, ApiBodyOptions } from '@nestjs/swagger'

export const AttendanceDoc = {
  authorization: {
    name: 'authorization',
    required: true,
    description: 'Bearer token for authentication',
  } as ApiHeaderOptions,

  idParam: {
    name: 'id',
    required: true,
    description: 'Attendance ID',
  } as ApiParamOptions,

  createBody: {
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'string',
          description: 'Encrypted data containing: idStudent, idClass, status (on/off), day',
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
          description: 'Encrypted data containing: idStudent, idClass, status (on/off), day',
        },
      },
    },
  } as ApiBodyOptions,
}

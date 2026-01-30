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
        idStudent: { type: 'string', example: '65b8f...' },
        idClass: { type: 'string', example: '65b8f...' },
        status: { type: 'string', enum: ['on', 'off'], default: 'on' },
        day: { type: 'string', example: '2024-01-30' },
      },
      required: ['idStudent', 'idClass', 'status', 'day'],
    },
  } as ApiBodyOptions,

  updateBody: {
    schema: {
      type: 'object',
      properties: {
        idStudent: { type: 'string' },
        idClass: { type: 'string' },
        status: { type: 'string', enum: ['on', 'off'] },
        day: { type: 'string' },
      },
    },
  } as ApiBodyOptions,
}

import { ApiHeaderOptions, ApiParamOptions, ApiBodyOptions } from '@nestjs/swagger'

export const PaymentDoc = {
  authorization: {
    name: 'authorization',
    required: true,
    description: 'Bearer token for authentication',
  } as ApiHeaderOptions,

  idParam: {
    name: 'id',
    required: true,
    description: 'Payment ID',
  } as ApiParamOptions,

  createBody: {
    schema: {
      type: 'object',
      properties: {
        idStudent: { type: 'string', example: '65b8f...' },
        idClass: { type: 'string', example: '65b8f...' },
        amount: { type: 'number', example: 500000 },
        month: { type: 'number', example: 1 },
        year: { type: 'number', example: 2024 },
        status: { type: 'string', enum: ['paid', 'partial', 'unpaid'], default: 'paid' },
        note: { type: 'string', example: 'Monthly fee', nullable: true },
      },
      required: ['idStudent', 'idClass', 'amount', 'month', 'year'],
    },
  } as ApiBodyOptions,

  updateBody: {
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        month: { type: 'number' },
        year: { type: 'number' },
        status: { type: 'string', enum: ['paid', 'partial', 'unpaid'] },
        note: { type: 'string', nullable: true },
      },
    },
  } as ApiBodyOptions,

  bulkUpsertBody: {
    schema: {
      type: 'object',
      properties: {
        payments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              idStudent: { type: 'string', example: '65b8f...' },
              idClass: { type: 'string', example: '65b8f...' },
              amount: { type: 'number', example: 500000 },
              month: { type: 'number', example: 1 },
              year: { type: 'number', example: 2024 },
              status: { type: 'string', enum: ['paid', 'partial', 'unpaid'], default: 'paid' },
              note: { type: 'string', example: 'Monthly fee', nullable: true },
            },
            required: ['idStudent', 'idClass', 'amount', 'month', 'year'],
          },
        },
      },
      required: ['payments'],
    },
  } as ApiBodyOptions,

  reportQuery: {
    idClass: { name: 'idClass', required: true, type: 'string' },
    month: { name: 'month', required: true, type: 'number' },
    year: { name: 'year', required: true, type: 'number' },
  },
}

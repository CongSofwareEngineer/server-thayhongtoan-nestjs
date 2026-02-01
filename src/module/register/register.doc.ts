import { ApiBodyOptions } from '@nestjs/swagger'

export const RegisterDoc = {
  createBody: {
    schema: {
      type: 'object',
      properties: {
        parent: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Nguyen Van B' },
            phone: { type: 'string', example: '0987654321' },
            address: { type: 'string', example: '123 Street, City', nullable: true },
            note: { type: 'string', example: 'Note about parent', nullable: true },
          },
          required: ['name', 'phone'],
        },
        students: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'Nguyen Van A' },
              age: { type: 'number', example: 10 },
              idClass: { type: 'string', example: '65b8f...', nullable: true },
              image: { type: 'string', example: 'https://...', nullable: true },
            },
            required: ['name', 'age'],
          },
        },
      },
      required: ['parent', 'students'],
    },
  } as ApiBodyOptions,
}

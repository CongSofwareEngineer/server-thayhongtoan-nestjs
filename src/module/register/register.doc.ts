import { ApiBodyOptions } from '@nestjs/swagger'

export const RegisterDoc = {
  createBody: {
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Nguyen Van A student' },
        parentName: { type: 'string', nullable: true, example: 'Nguyen Van B parent' },
        phone: { type: 'string', example: '0987654321' },
        address: { type: 'string', nullable: true, example: '123 ABC Street' },
        age: { type: 'number', example: 10 },
        idClass: { type: 'string', example: '65b8f...' },
      },
      required: ['name', 'phone', 'idClass'],
    },
  } as ApiBodyOptions,
}

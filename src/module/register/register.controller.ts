import { Body, Controller, Post, Res } from '@nestjs/common'
import { RegisterService } from './register.service'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { formatRes } from 'src/utils/function'
import { RegisterDoc } from './register.doc'

@ApiTags('Register')
@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) { }

  @ApiBody(RegisterDoc.createBody)
  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.registerService.create(body)
    return formatRes(res, data)
  }
}

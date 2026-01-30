import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common'
import { RegisterService } from './register.service'
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'
import { formatRes } from 'src/utils/function'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RegisterDoc } from './register.doc'

@ApiBearerAuth()
@ApiTags('Register')
@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) { }

  @Get('all')
  async getAll(@Res() res, @Query() query) {
    const data = await this.registerService.getAll(query)
    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam(RegisterDoc.idParam)
  @Delete('delete/:id')
  async delete(@Res() res, @Param() param) {
    const data = await this.registerService.delete(param.id)
    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam(RegisterDoc.idParam)
  @ApiBody(RegisterDoc.updateBody)
  @Post('update/:id')
  async update(@Res() res, @Param() param, @Body() body) {
    const data = await this.registerService.update(param.id, body.data)
    return formatRes(res, data)
  }

  @ApiBody(RegisterDoc.createBody)
  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.registerService.create(body.data)
    return formatRes(res, data)
  }
}

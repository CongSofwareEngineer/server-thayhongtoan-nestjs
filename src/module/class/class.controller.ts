import { Body, Controller, Delete, Param, Post, Res, UseGuards } from '@nestjs/common'
import { ClassService } from './class.service'
import { ApiBearerAuth, ApiBody, ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger'
import { formatRes } from 'src/utils/function'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ClassDoc } from './class.doc'

@ApiBearerAuth()
@ApiTags('Class')
@Controller('class')
export class ClassController {
  constructor(private classService: ClassService) { }

  @ApiHeader(ClassDoc.authorization)
  @UseGuards(JwtAuthGuard)
  @ApiParam(ClassDoc.idParam)
  @Delete('delete/:id')
  async delete(@Res() res, @Param() param) {
    const data = await this.classService.delete(param.id)
    return formatRes(res, data)
  }

  @ApiHeader(ClassDoc.authorization)
  @UseGuards(JwtAuthGuard)
  @ApiParam(ClassDoc.idParam)
  @ApiBody(ClassDoc.updateBody)
  @Post('update/:id')
  async update(@Res() res, @Param() param, @Body() body) {
    const data = await this.classService.update(param.id, body.data)
    return formatRes(res, data)
  }

  @ApiHeader(ClassDoc.authorization)
  @UseGuards(JwtAuthGuard)
  @ApiBody(ClassDoc.createBody)
  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.classService.create(body.data)
    return formatRes(res, data)
  }
}

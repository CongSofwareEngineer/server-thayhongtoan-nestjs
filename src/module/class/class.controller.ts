import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common'
import { ClassService } from './class.service'
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { formatRes } from 'src/utils/function'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ClassDoc } from './class.doc'

@ApiBearerAuth()
@ApiTags('Class')
@Controller('class')
export class ClassController {
  constructor(private classService: ClassService) { }

  @UseGuards(JwtAuthGuard)
  @ApiQuery(ClassDoc.queryName)
  @ApiQuery(ClassDoc.queryId)
  @Get('get-all')
  async getAll(@Res() res, @Query() query) {
    const data = await this.classService.getAll(query)
    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam(ClassDoc.idParam)
  @Delete('delete/:id')
  async delete(@Res() res, @Param() param) {
    const data = await this.classService.delete(param.id)
    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam(ClassDoc.idParam)
  @ApiBody(ClassDoc.updateBody)
  @Post('update/:id')
  async update(@Res() res, @Param() param, @Body() body) {
    const data = await this.classService.update(param.id, body)
    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody(ClassDoc.createBody)
  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.classService.create(body)
    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam(ClassDoc.idParam)
  @Post('get-full/:id')
  async getFull(@Res() res, @Param() param, @Query() query) {
    const data = await this.classService.getFullInfo(param.id, query)
    return formatRes(res, data)
  }
}

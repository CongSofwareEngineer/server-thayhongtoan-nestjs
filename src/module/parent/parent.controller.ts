import { Body, Controller, Delete, Param, Post, Res, UseGuards, Get, Query } from '@nestjs/common'
import { ParentService } from './parent.service'
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { formatRes } from 'src/utils/function'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ParentDoc } from './parent.doc'

@ApiBearerAuth()
@ApiTags('Parent')
@Controller('parent')
export class ParentController {
  constructor(private parentService: ParentService) { }

  @ApiQuery(ParentDoc.queryName)
  @ApiQuery(ParentDoc.queryPhone)
  @Get('get-all')
  async getAll(@Res() res, @Query() query) {
    const data = await this.parentService.getAll(query)

    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam(ParentDoc.idParam)
  @Delete('delete/:id')
  async delete(@Res() res, @Param() param) {
    const data = await this.parentService.delete(param.id)

    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam(ParentDoc.idParam)
  @ApiBody(ParentDoc.updateBody)
  @Post('update/:id')
  async update(@Res() res, @Param() param, @Body() body) {
    const data = await this.parentService.update(param.id, body)

    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody(ParentDoc.createBody)
  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.parentService.create(body)

    return formatRes(res, data)
  }


}

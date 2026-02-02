import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common'
import { TeacherService } from './teacher.service'
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'
import { formatRes } from 'src/utils/function'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { TeacherDoc } from './teacher.doc'

@ApiBearerAuth()
@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) { }

  @ApiBody(TeacherDoc.loginBody)
  @Post('login')
  async login(@Res() res, @Body() body) {
    const data = await this.teacherService.login(body)

    res.cookie('tokenAccess', data.tokens.tokenAccess, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,//15 min
    })
    res.cookie('tokenRefresh', data.tokens.tokenRefresh, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 24 * 60 * 60 * 1000,//15 days
    })

    return formatRes(res, { teacher: data.teacher })
  }

  @Get('all')
  async getAll(@Res() res, @Query() query) {
    const data = await this.teacherService.getAll(query)

    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam(TeacherDoc.idParam)
  @Delete('delete/:id')
  async delete(@Res() res, @Param() param) {
    const data = await this.teacherService.delete(param.id)

    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam(TeacherDoc.idParam)
  @ApiBody(TeacherDoc.updateBody)
  @Post('update/:id')
  async update(@Res() res, @Param() param, @Body() body) {
    const data = await this.teacherService.update(param.id, body)

    return formatRes(res, data)
  }

  // @UseGuards(JwtAuthGuard)
  @ApiBody(TeacherDoc.createBody)
  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.teacherService.create(body)

    return formatRes(res, data)
  }
}

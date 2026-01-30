import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common'
import { AttendanceService } from './attendance.service'
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'
import { formatRes } from 'src/utils/function'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { AttendanceDoc } from './attendance.doc'

@ApiBearerAuth()
@ApiTags('Attendance')
@UseGuards(JwtAuthGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) { }

  @Get('all')
  async getAll(@Res() res, @Query() query) {
    const data = await this.attendanceService.getAll(query)
    return formatRes(res, data)
  }

  @ApiParam(AttendanceDoc.idParam)
  @Delete('delete/:id')
  async delete(@Res() res, @Param() param) {
    const data = await this.attendanceService.delete(param.id)
    return formatRes(res, data)
  }

  @ApiParam(AttendanceDoc.idParam)
  @ApiBody(AttendanceDoc.updateBody)
  @Post('update/:id')
  async update(@Res() res, @Param() param, @Body() body) {
    const data = await this.attendanceService.update(param.id, body.data)
    return formatRes(res, data)
  }

  @ApiBody(AttendanceDoc.createBody)
  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.attendanceService.create(body.data)
    return formatRes(res, data)
  }
}

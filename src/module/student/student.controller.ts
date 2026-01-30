import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common'
import { StudentService } from './student.service'
import { ApiBearerAuth, ApiBody, ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger'
import { formatRes } from 'src/utils/function'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { StudentDoc } from './student.doc'

@ApiBearerAuth()
@ApiTags('Student')
@UseGuards(JwtAuthGuard)
@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) { }

  @Get('all')
  async getAll(@Res() res, @Query() query) {
    const data = await this.studentService.getAll(query)
    return formatRes(res, data)
  }

  @ApiHeader(StudentDoc.authorization)
  @ApiParam(StudentDoc.idParam)
  @Delete('delete/:id')
  async delete(@Res() res, @Param() param) {
    const data = await this.studentService.delete(param.id)
    return formatRes(res, data)
  }

  @ApiHeader(StudentDoc.authorization)
  @ApiParam(StudentDoc.idParam)
  @ApiBody(StudentDoc.updateBody)
  @Post('update/:id')
  async update(@Res() res, @Param() param, @Body() body) {
    const data = await this.studentService.update(param.id, body.data)
    return formatRes(res, data)
  }

  @ApiHeader(StudentDoc.authorization)
  @ApiBody(StudentDoc.createBody)
  @Post('create')
  async create(@Res() res, @Body() body) {
    const data = await this.studentService.create(body.data)
    return formatRes(res, data)
  }
}

import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards, UnauthorizedException, Req } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'
import { formatRes } from 'src/utils/function'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { PaymentDoc } from './payment.doc'
import { TeacherService } from '../teacher/teacher.service'

@ApiBearerAuth()
@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private teacherService: TeacherService,
  ) { }

  @Get('all')
  async getAll(@Res() res, @Query() query) {
    const data = await this.paymentService.getAll(query)
    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam(PaymentDoc.idParam)
  @Delete('delete/:id')
  async delete(@Res() res, @Param() param) {
    const data = await this.paymentService.delete(param.id)
    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam(PaymentDoc.idParam)
  @ApiBody(PaymentDoc.updateBody)
  @Post('update/:id')
  async update(@Res() res, @Param() param, @Body() body) {
    const data = await this.paymentService.update(param.id, body)
    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody(PaymentDoc.createBody)
  @Post('create')
  async create(@Res() res, @Body() body, @Req() req) {
    const user = req.user
    const teacher = await this.teacherService.findById(user.id)
    if (!teacher || !teacher.isAdmin) {
      throw new UnauthorizedException('Only admins can create payments')
    }
    const data = await this.paymentService.create({ ...body, idTeacher: user.id })
    return formatRes(res, data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody(PaymentDoc.bulkUpsertBody)
  @Post('batch-update')
  async bulkUpsert(@Res() res, @Body() body, @Req() req) {
    const user = req.user
    const teacher = await this.teacherService.findById(user.id)
    if (!teacher || !teacher.isAdmin) {
      throw new UnauthorizedException('Only admins can perform bulk updates')
    }
    const data = await this.paymentService.upsertMonthlyPayments(user.id, body.payments)
    return formatRes(res, data)
  }

  @Get('report')
  async getReport(@Res() res, @Query() query) {
    const { idClass, month, year } = query
    if (!idClass || !month || !year) {
      throw new UnauthorizedException('Missing report parameters')
    }
    const data = await this.paymentService.getMonthlyReport(idClass, parseInt(month), parseInt(year))
    return formatRes(res, data)
  }
}

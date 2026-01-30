import { Controller, Get, Post, Request, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { formatRes } from 'src/utils/function'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthDoc } from './auth.doc'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiHeader(AuthDoc.authorization)
  @Post('/refresh')
  async refreshToken(@Res() res, @Request() req) {
    const token = req.headers.authorization
    const dataVerify = this.authService.verifyAth(token, true)

    if (dataVerify && typeof dataVerify !== 'boolean') {
      const tokenAccess = this.authService.generateAuthAccess(dataVerify.id, dataVerify.sdt)
      return formatRes(res, { token: tokenAccess })
    }
    return formatRes(res, null)
  }

  @Get('/ping')
  async pingServer(@Res() res, @Request() req) {
    return formatRes(res, {
      isWork: true,
    })
  }
}

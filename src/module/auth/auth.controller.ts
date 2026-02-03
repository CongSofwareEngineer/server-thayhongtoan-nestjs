import { Controller, Get, Post, Request, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { formatRes } from 'src/utils/function'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/refresh')
  async refreshToken(@Res() res, @Request() req) {
    const tokenRefresh = req.cookies.tokenRefresh || ''


    const dataVerify = this.authService.verifyAth(tokenRefresh, true)


    if (dataVerify && typeof dataVerify !== 'boolean') {
      const tokenAccess = this.authService.generateAuthAccess(dataVerify.id, dataVerify.sdt)

      res.cookie('tokenAccess', tokenAccess, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,//15 min
      })

      return formatRes(res, { status: true })
    }

    return formatRes(res, { status: false })
  }

  @Get('/ping')
  async pingServer(@Res() res, @Request() req) {
    return formatRes(res, {
      isWork: true,
    })
  }
}

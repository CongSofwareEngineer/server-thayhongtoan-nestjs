import { Module, Global } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { JWT_AUTH } from 'src/common/app'

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: JWT_AUTH.secret,
      signOptions: { expiresIn: JWT_AUTH.expiredAccess },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }

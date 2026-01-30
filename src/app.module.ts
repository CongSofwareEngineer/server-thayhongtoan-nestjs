import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

import { DB_NAME } from './common/mongoDB'
import { LoggerMiddleware } from './logger.middleware'

// Modules
import { AuthModule } from './module/auth/auth.module'
import { HealthModule } from './module/health/health.module'
import { RegisterModule } from './module/register/register.module'
import { ClassModule } from './module/class/class.module'
import { StudentModule } from './module/student/student.module'
import { AttendanceModule } from './module/attendance/attendance.module'
import { TeacherModule } from './module/teacher/teacher.module'
import { PaymentModule } from './module/payment/payment.module'

export const throttlerOptions = {
  throttlers: [
    {
      name: 'short',
      ttl: 1000,    // 1 second
      limit: 5,     // 5 requests
    },
    {
      name: 'long',
      ttl: 60000,   // 1 minute  
      limit: 50,    // 50 requests
    },
  ],
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.test.local', // Fallback to standard .env
    }),
    ThrottlerModule.forRoot(throttlerOptions.throttlers),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
      `mongodb+srv://${process.env.USER_NAME_MONGO}:${process.env.PASSWORD_MONGO}@tc-store-admin.mpkyxqj.mongodb.net/?retryWrites=true&w=majority&appName=tc-store-admin`,
      {
        dbName: DB_NAME,
        enableUtf8Validation: true,
      },
    ),
    // Business Modules
    AuthModule,
    HealthModule,
    RegisterModule,
    ClassModule,
    StudentModule,
    AttendanceModule,
    TeacherModule,
    PaymentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/*')
  }
}

import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Payment, PaymentSchema } from './schemas/payment.schema'
import { Student, StudentSchema } from '../student/schemas/student.schema'
import { Class, ClassSchema } from '../class/schemas/class.schema'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { TeacherModule } from '../teacher/teacher.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Class.name, schema: ClassSchema },
    ]),
    TeacherModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule { }

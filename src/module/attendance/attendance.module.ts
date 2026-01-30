import { MongooseModule } from '@nestjs/mongoose'
import { DB_COLLECTION } from 'src/common/mongoDB'
import { Attendance, AttendanceSchema } from './schemas/attendance.schema'
import { Module } from '@nestjs/common'
import { AttendanceService } from './attendance.service'
import { AttendanceController } from './attendance.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Attendance.name,
        schema: AttendanceSchema,
        collection: DB_COLLECTION.Attendance,
      },
    ]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [],
})
export class AttendanceModule { }

import { MongooseModule } from '@nestjs/mongoose'
import { DB_COLLECTION } from 'src/common/mongoDB'
import { Student, StudentSchema } from './schemas/student.schema'
import { Module } from '@nestjs/common'
import { StudentService } from './student.service'
import { StudentController } from './student.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
        collection: DB_COLLECTION.Student,
      },
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [],
})
export class StudentModule { }

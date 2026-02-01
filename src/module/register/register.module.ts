import { MongooseModule } from '@nestjs/mongoose'
import { DB_COLLECTION } from 'src/common/mongoDB'
import { Module } from '@nestjs/common'
import { Parent, ParentSchema } from '../parent/schemas/parent.schema'
import { Student, StudentSchema } from '../student/schemas/student.schema'
import { RegisterService } from './register.service'
import { RegisterController } from './register.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Parent.name,
        schema: ParentSchema,
        collection: DB_COLLECTION.Parent,
      },
      {
        name: Student.name,
        schema: StudentSchema,
        collection: DB_COLLECTION.Student,
      },
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [],
})
export class RegisterModule { }

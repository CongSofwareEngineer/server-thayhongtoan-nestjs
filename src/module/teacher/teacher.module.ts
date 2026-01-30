import { MongooseModule } from '@nestjs/mongoose'
import { DB_COLLECTION } from 'src/common/mongoDB'
import { Teacher, TeacherSchema } from './schemas/teacher.schema'
import { Module } from '@nestjs/common'
import { TeacherService } from './teacher.service'
import { TeacherController } from './teacher.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Teacher.name,
        schema: TeacherSchema,
        collection: DB_COLLECTION.Teacher,
      },
    ]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [],
})
export class TeacherModule { }
